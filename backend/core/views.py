from rest_framework import viewsets, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from django_filters.rest_framework import DjangoFilterBackend
from django.db.models import Sum, Count
from datetime import datetime, timedelta
from .models import Category, LearningLog, UserStat
from .serializers import CategorySerializer, LearningLogSerializer, UserStatSerializer


class CategoryViewSet(viewsets.ModelViewSet):
    """カテゴリ管理ViewSet"""
    serializer_class = CategorySerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['name']
    permission_classes = [AllowAny]  # Temporary for development

    def get_queryset(self):
        # For development, return all categories
        return Category.objects.all()

    def perform_create(self, serializer):
        # For development, use first user or create one
        from django.contrib.auth.models import User
        user, created = User.objects.get_or_create(username='testuser')
        serializer.save(user=user)


class LearningLogViewSet(viewsets.ModelViewSet):
    """学習ログ管理ViewSet"""
    serializer_class = LearningLogSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['category', 'learned_at']
    search_fields = ['title', 'description']
    ordering_fields = ['learned_at', 'created_at', 'duration_minutes']
    ordering = ['-learned_at', '-created_at']
    permission_classes = [AllowAny]  # Temporary for development

    def get_queryset(self):
        queryset = LearningLog.objects.all()  # For development, return all logs
        
        # 日付範囲フィルタ
        date_from = self.request.query_params.get('date_from')
        date_to = self.request.query_params.get('date_to')
        
        if date_from:
            queryset = queryset.filter(learned_at__gte=date_from)
        if date_to:
            queryset = queryset.filter(learned_at__lte=date_to)
            
        return queryset

    def perform_create(self, serializer):
        # For development, use first user or create one
        from django.contrib.auth.models import User
        user, created = User.objects.get_or_create(username='testuser')
        serializer.save(user=user)

    @action(detail=False, methods=['get'])
    def stats(self, request):
        """学習統計情報を取得"""
        queryset = self.get_queryset()
        
        # 期間フィルタ
        period = request.query_params.get('period', 'all')
        if period == 'week':
            start_date = datetime.now().date() - timedelta(days=7)
            queryset = queryset.filter(learned_at__gte=start_date)
        elif period == 'month':
            start_date = datetime.now().date() - timedelta(days=30)
            queryset = queryset.filter(learned_at__gte=start_date)
        
        # 統計計算
        total_duration = queryset.aggregate(total=Sum('duration_minutes'))['total'] or 0
        category_stats = queryset.values('category__name').annotate(
            total_duration=Sum('duration_minutes'),
            count=Count('id')
        )
        
        return Response({
            'total_duration_minutes': total_duration,
            'total_duration_hours': total_duration / 60,
            'category_stats': category_stats,
            'total_logs': queryset.count()
        })


class UserStatViewSet(viewsets.ReadOnlyModelViewSet):
    """ユーザーステータスViewSet（読み取り専用）"""
    serializer_class = UserStatSerializer
    permission_classes = [AllowAny]  # Temporary for development

    def get_queryset(self):
        # For development, return all stats
        return UserStat.objects.all()

    @action(detail=False, methods=['get'])
    def dashboard(self, request):
        """ダッシュボード用の統計情報を取得"""
        # For development, use first user or create one
        from django.contrib.auth.models import User
        user, created = User.objects.get_or_create(username='testuser')
        user_stat, created = UserStat.objects.get_or_create(user=user)
        
        # 最近の学習ログ
        recent_logs = LearningLog.objects.filter(user=user).order_by('-created_at')[:5]
        
        # 週間・月間統計
        week_ago = datetime.now().date() - timedelta(days=7)
        month_ago = datetime.now().date() - timedelta(days=30)
        
        weekly_duration = LearningLog.objects.filter(
            user=user, learned_at__gte=week_ago
        ).aggregate(total=Sum('duration_minutes'))['total'] or 0
        
        monthly_duration = LearningLog.objects.filter(
            user=user, learned_at__gte=month_ago
        ).aggregate(total=Sum('duration_minutes'))['total'] or 0
        
        return Response({
            'user_stat': UserStatSerializer(user_stat).data,
            'recent_logs': LearningLogSerializer(recent_logs, many=True).data,
            'weekly_duration_minutes': weekly_duration,
            'monthly_duration_minutes': monthly_duration,
        })