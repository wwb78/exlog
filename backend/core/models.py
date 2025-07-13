from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone


# Create your models here.
class Category(models.Model):
    """学習カテゴリモデル"""
    name = models.CharField(max_length=100, verbose_name="カテゴリ名")
    color = models.CharField(max_length=7, default="#3399cc", verbose_name="色コード")
    user = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name="ユーザー")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="作成日時")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="更新日時")

    class Meta:
        verbose_name = "カテゴリ"
        verbose_name_plural = "カテゴリ"
        unique_together = ['name', 'user']  # ユーザーごとにカテゴリ名は一意

    def __str__(self):
        return f"{self.user.username} - {self.name}"


class LearningLog(models.Model):
    """学習ログモデル"""
    title = models.CharField(max_length=200, verbose_name="学習タイトル")
    description = models.TextField(blank=True, verbose_name="詳細メモ")
    category = models.ForeignKey(
        Category, 
        on_delete=models.CASCADE, 
        verbose_name="カテゴリ"
    )
    duration_minutes = models.PositiveIntegerField(verbose_name="学習時間（分）")
    learned_at = models.DateField(default=timezone.now, verbose_name="学習日")
    user = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name="ユーザー")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="作成日時")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="更新日時")

    class Meta:
        verbose_name = "学習ログ"
        verbose_name_plural = "学習ログ"
        ordering = ['-learned_at', '-created_at']

    def __str__(self):
        return f"{self.user.username} - {self.title} ({self.learned_at})"


class UserStat(models.Model):
    """ユーザーステータスモデル（XP・レベル管理）"""
    user = models.OneToOneField(User, on_delete=models.CASCADE, verbose_name="ユーザー")
    total_xp = models.PositiveIntegerField(default=0, verbose_name="累計経験値")
    level = models.PositiveIntegerField(default=1, verbose_name="現在のレベル")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="作成日時")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="更新日時")

    class Meta:
        verbose_name = "ユーザーステータス"
        verbose_name_plural = "ユーザーステータス"

    def __str__(self):
        return f"{self.user.username} - Level {self.level} (XP: {self.total_xp})"

    def add_xp(self, xp_amount):
        """経験値を追加し、レベルアップを計算"""
        self.total_xp += xp_amount
        # レベル計算（簡単な計算式：レベル = 1 + (XP / 100)）
        new_level = 1 + (self.total_xp // 100)
        if new_level > self.level:
            self.level = new_level
        self.save()
