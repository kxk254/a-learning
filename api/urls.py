from django.urls import path
from rest_framework.routers import DefaultRouter

from . import views
from .views import OrderViewSet

router = DefaultRouter()
router.register(r"order", OrderViewSet, basename="order")
urlpatterns = [
    path("products/", views.ProductListCreateAPIView.as_view()),
    # path('products/create',views.ProductCreateAPIView.as_view()),
    path("products/info", views.ProductInfoAPIView.as_view()),
    path("products/<int:product_id>/", views.ProductDetailAPIView.as_view()),
    #  path("orders/", views.OrderListAPIView.as_view()),
    #  path("user-orders/", views.UserOrderListAPIView.as_view(), name="user-orders"),
]
urlpatterns += router.urls
