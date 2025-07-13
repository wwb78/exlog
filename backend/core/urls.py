from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CategoryViewSet, LearningLogViewSet, UserStatViewSet

router = DefaultRouter()
router.register(r'categories', CategoryViewSet, basename='category')
router.register(r'logs', LearningLogViewSet, basename='learninglog')
router.register(r'user-stats', UserStatViewSet, basename='userstat')

urlpatterns = [
    path('api/', include(router.urls)),
]