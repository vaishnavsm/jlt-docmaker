from django.urls import path
from . import views
from . import engine


urlpatterns = [
    path('create/', views.create_user),
    path('login/', views.login_user),
    path('add_admin/', views.set_admin),
    path('remove_admin/', views.remove_admin),
    path('set_level/', views.set_level),
    path('template/', views.template),
    path('auth_template/', views.auth_template),
    path('get_template/', views.get_template),

    path('recommend_templates/', engine.recommend_templates),
    path('fill_template/',engine.fill_template),
    path('find_difference_and_batch_apply/',engine.find_difference_and_batch_apply),
]