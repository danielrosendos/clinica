from django.contrib import admin
from django.urls import path, include
from rest_framework import routers

from app.urls import router
from app.views import LogoutViewSet, LoginViewSet, RegisterUserViewSet

router = routers.DefaultRouter()

router.register(r'register', RegisterUserViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('api/v1/', include(router.urls)),
    path('admin/', admin.site.urls),
    path('api/v1/login/', LoginViewSet.as_view()),
    path('api/v1/logout/', LogoutViewSet.as_view()),
]
