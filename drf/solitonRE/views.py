from django.shortcuts import render
from .models import *
from rest_framework import permissions, viewsets
from .serializers import *
from django.utils import timezone
from rest_framework.decorators import action
from rest_framework.response import Response
from datetime import datetime
from dateutil.relativedelta import relativedelta


# Create your views here
class TenantViewSet(viewsets.ModelViewSet):
    queryset = Tenant.objects.all()
    serializer_class = TenantSerializer


class BukkenViewSet(viewsets.ModelViewSet):
    queryset = Bukken.objects.all()
    serializer_class = BukkenSerializer

class InvoiceIdViewSet(viewsets.ModelViewSet):
    queryset = InvoiceId.objects.all().order_by("-id")
    serializer_class = InvoiceIdSerializer


class InvoiceTaxBreakdownViewSet(viewsets.ModelViewSet):
    queryset = InvoiceTaxBreakdown.objects.all().order_by("-invoice_id")
    serializer_class = InvoiceTaxBreakdownSerializer


class RevenueViewSet(viewsets.ModelViewSet):
    """
    invoiceid is one-to-many
    RevenueViewSet has many and InvoiceId has one [RevenueViewSet]=InvoiceId
    InvoiceId = InvoiceTaxBreakdown linked via invoice
    """

    queryset = Revenue.objects.all()
    serializer_class = RevenueSerializer

    @action(detail=False, methods=["get"])
    def by_invoices(self, request):
        revenues = Revenue.objects.all()
        invoices = InvoiceId.objects.all()
        bukken = request.query_params.get("bukken")
        month_now = request.query_params.get(
            "months", timezone.now().strftime("%Y-%m-%d")
        )
        current_date = datetime.strptime(month_now, "%Y-%m-%d")
        prev_year_date = current_date - relativedelta(months=2)
        month_prev = prev_year_date.strftime("%Y-%m-%d")

        invoice_ids = request.query_params.getlist("invoiceid")

        if invoice_ids:
            revenues = revenues.filter(invoiceid__in=invoice_ids)
            invoices = invoices.filter(invoiceid__in=invoice_ids)
        if bukken:
            revenues = revenues.filter(bukken=bukken)
            invoices = invoices.filter(bukken=bukken)
        if month_now:
            revenues = revenues.filter(report_date__range=[month_prev, month_now])
            invoices = invoices.filter(report_date__range=[month_prev, month_now])

        return Response(
            {
                "invoices": InvoiceIdSerializer(invoices, many=True).data,
                "revenues": RevenueSerializer(revenues, many=True).data,
            }
        )
