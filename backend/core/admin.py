from django.contrib import admin
from .models import Category, LearningLog, UserStat


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ['name', 'user', 'color', 'created_at']
    list_filter = ['user', 'created_at']
    search_fields = ['name', 'user__username']
    ordering = ['-created_at']


@admin.register(LearningLog)
class LearningLogAdmin(admin.ModelAdmin):
    list_display = ['title', 'user', 'category', 'duration_minutes', 'learned_at', 'created_at']
    list_filter = ['user', 'category', 'learned_at', 'created_at']
    search_fields = ['title', 'description', 'user__username']
    ordering = ['-learned_at', '-created_at']
    date_hierarchy = 'learned_at'


@admin.register(UserStat)
class UserStatAdmin(admin.ModelAdmin):
    list_display = ['user', 'level', 'total_xp', 'created_at']
    list_filter = ['level', 'created_at']
    search_fields = ['user__username']
    ordering = ['-total_xp']