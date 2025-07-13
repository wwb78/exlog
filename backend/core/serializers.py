from rest_framework import serializers
from .models import Category, LearningLog, UserStat


class CategorySerializer(serializers.ModelSerializer):
    """カテゴリシリアライザー"""
    
    class Meta:
        model = Category
        fields = ['id', 'name', 'color', 'created_at', 'updated_at']
        read_only_fields = ['created_at', 'updated_at']


class LearningLogSerializer(serializers.ModelSerializer):
    """学習ログシリアライザー（カテゴリ情報を含む）"""
    category = CategorySerializer(read_only=True)
    category_id = serializers.IntegerField(write_only=True)
    
    class Meta:
        model = LearningLog
        fields = [
            'id', 'title', 'description', 'category', 'category_id',
            'duration_minutes', 'learned_at', 'created_at', 'updated_at'
        ]
        read_only_fields = ['created_at', 'updated_at']

    def create(self, validated_data):
        """学習ログ作成時にXPを追加"""
        user = self.context['request'].user
        log = LearningLog.objects.create(user=user, **validated_data)
        
        # XP追加（学習時間に応じて計算）
        xp_gained = validated_data['duration_minutes'] // 10  # 10分で1XP
        user_stat, created = UserStat.objects.get_or_create(user=user)
        user_stat.add_xp(xp_gained)
        
        return log


class UserStatSerializer(serializers.ModelSerializer):
    """ユーザーステータスシリアライザー"""
    
    class Meta:
        model = UserStat
        fields = ['total_xp', 'level', 'created_at', 'updated_at']
        read_only_fields = ['total_xp', 'level', 'created_at', 'updated_at']