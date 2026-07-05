from .models import *
from rest_framework import serializers


class TenantSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Tenant
        fields = "__all__"
