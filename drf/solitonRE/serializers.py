from .models import *
from rest_framework import serializers


class TenantSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tenant
        fields = "__all__"


class BukkenSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bukken
        fields = "__all__"


class InvoiceIdSerializer(serializers.ModelSerializer):
    tenant_name = serializers.CharField(source="tenant.name", read_only=True)
    bukken_name = serializers.CharField(source="bukken.name", read_only=True)

    class Meta:
        model = InvoiceId
        fields = "__all__"


class InvoiceTaxBreakdownSerializer(serializers.ModelSerializer):
    class Meta:
        model = InvoiceTaxBreakdown
        fields = "__all__"


class RevenueSerializer(serializers.ModelSerializer):
    tenant_name = serializers.CharField(source="tenant.name", read_only=True)
    bukken_name = serializers.CharField(source="bukken.name", read_only=True)
    account_code_name = serializers.CharField(
        source="account_code.name", read_only=True
    )

    class Meta:
        model = Revenue
        fields = "__all__"
