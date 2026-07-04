from django.db import models
from django.contrib.auth.models import AbstractUser
from django.db import IntegrityError
from django.utils.text import slugify
from django.db.models import F
from decimal import Decimal
import re


class User(AbstractUser):
    pass


class Tenant(models.Model):
    name = models.CharField("名称", max_length=50)
    short_name = models.CharField("略称", max_length=20)
    year = models.CharField("入居年", max_length=10)
    floor = models.CharField("基準階", max_length=10)
    base = models.CharField("基準物件", max_length=10)
    address = models.CharField("住所", max_length=250, blank=True, null=True)
    phone = models.CharField("電話", max_length=50, blank=True, null=True)
    contact = models.CharField("担当者", max_length=50, blank=True, null=True)
    email1 = models.EmailField("メール１", blank=True, null=True)
    email2 = models.EmailField("メール２", blank=True, null=True)
    email3 = models.EmailField("メール３", blank=True, null=True)
    email4 = models.EmailField("メール４４", blank=True, null=True)
    slug = models.CharField("スラグ", max_length=20, blank=True, null=True)

    def save(self, *args, **kwargs):
        """Override save method to delete old slugs and reassign new ones."""
        slug = f"{self.base}-{self.floor}-{self.year}"
        self.slug = slug

        super().save(*args, **kwargs)  # Call the original save method

    def __str__(self):
        return self.short_name

    class Meta:
        ordering = ["slug"]


class Entity(models.Model):
    entity_name = models.CharField("名称", max_length=50)
    short_name = models.CharField("略称", max_length=20)
    post_code = models.CharField("郵便番号", max_length=20, blank=True, null=True)
    address = models.CharField("住所", max_length=100, blank=True, null=True)
    address2 = models.CharField("住所2", max_length=100, blank=True, null=True)
    tax_number = models.CharField("登録番号", max_length=20, blank=True, null=True)
    bank = models.CharField("銀行名", max_length=20, blank=True, null=True)
    branch = models.CharField("支店名", max_length=20, blank=True, null=True)
    acount_type = models.CharField("預金種別", max_length=20, blank=True, null=True)
    account_number = models.CharField("口座番号", max_length=20, blank=True, null=True)
    bank_name_kana = models.CharField(
        "口座名義人（カナ）", max_length=20, blank=True, null=True
    )
    bank_name_kanji = models.CharField(
        "口座名義人", max_length=20, blank=True, null=True
    )

    def __str__(self):
        return self.short_name


class Bukken(models.Model):
    name = models.CharField("名称", max_length=50)
    short_name = models.CharField("略称", max_length=20)
    post_code = models.CharField("郵便番号", max_length=20, blank=True, null=True)
    address = models.CharField("住所", max_length=250, blank=True, null=True)
    type = models.CharField("物件タイプ", max_length=50, blank=True, null=True)
    build_date = models.DateField("建築日", blank=True, null=True)
    land_sqm = models.DecimalField(
        "土地面積㎡", max_digits=8, decimal_places=2, blank=True, null=True
    )
    build_sqm = models.DecimalField(
        "建物面積㎡", max_digits=8, decimal_places=2, blank=True, null=True
    )
    structure = models.CharField("構造", max_length=20, default="")
    floor_size = models.TextField("規模", max_length=50, blank=True, null=True)
    elevator = models.CharField("EV", max_length=50, blank=True, null=True)
    ceiling = models.CharField("天井高", max_length=50, blank=True, null=True)
    floor = models.CharField("床仕様", max_length=50, blank=True, null=True)
    aircon = models.CharField("空調", max_length=50, blank=True, null=True)
    toilet = models.CharField("トイレ", max_length=50, blank=True, null=True)
    entrance = models.TextField(
        "エントランス開放時間", max_length=150, blank=True, null=True
    )
    other = models.TextField("その他仕様", max_length=150, blank=True, null=True)
    latitude = models.DecimalField("経度", max_digits=10, decimal_places=6, default=0.0)
    longtitude = models.DecimalField(
        "経度", max_digits=10, decimal_places=6, default=0.0
    )
    entity = models.ForeignKey(
        Entity,
        verbose_name="エンティティ",
        on_delete=models.CASCADE,
        blank=True,
        null=True,
    )
    note = models.TextField("備考", blank=True, null=True)

    def __str__(self):
        return self.short_name


class Subcontractor(models.Model):
    name = models.CharField("名称", max_length=50)
    short_name = models.CharField("略称", max_length=20)
    address = models.CharField("住所", max_length=250, blank=True, null=True)
    phone = models.CharField("電話", max_length=50, blank=True, null=True)
    contact = models.CharField("担当者", max_length=50, blank=True, null=True)
    email1 = models.EmailField("メール１", blank=True, null=True)
    note = models.CharField("備考", max_length=250, blank=True, null=True)
    slug = models.CharField("スラグ", max_length=20, unique=True)

    def __str__(self):
        return self.short_name


class Tax(models.Model):
    display_rate = models.CharField(
        "税率（表示用）", max_length=20, default="10%"
    )  # 税率を追加 20250326
    rate_decimal = models.DecimalField(
        "税率（小数）", max_digits=5, decimal_places=4, default=0.1
    )
    print_form = models.CharField("印刷用", max_length=20, null=True, blank=True)

    def save(self, *args, **kwargs):
        # 数字のみ抽出し、パーセントを小数に変換（例: "10%" → 0.10）
        match = re.match(r"^(\d+(\.\d+)?)%", self.display_rate)
        if match:
            percent_value = Decimal(match.group(1)) / 100
            self.rate_decimal = percent_value
        super().save(*args, **kwargs)

    def __str__(self):
        return self.print_form or self.display_rate


class AccountCode(models.Model):
    name = models.CharField("名称", max_length=50)
    short_name = models.CharField("略称", max_length=20)
    rev_exp = models.CharField("費用・売上", max_length=20)
    tax_rate = models.ForeignKey(
        Tax, verbose_name="税率", on_delete=models.CASCADE, default=1
    )  # models.ForeignKey(Tax, verbose_name='税率', on_delete=models.CASCADE, default=1)  # models.IntegerField(null=True, blank=True) #
    note = models.CharField("備考", max_length=250, blank=True, null=True)
    slug = models.CharField("スラグ", max_length=20, unique=True)

    def __str__(self):
        return self.short_name

    class Meta:
        ordering = ["slug"]


class Guarantor(models.Model):
    name = models.CharField("名称", max_length=50)
    short_name = models.CharField("略称", max_length=20)
    address = models.CharField("住所", max_length=250, blank=True, null=True)
    contact = models.CharField("担当者", max_length=50, blank=True, null=True)
    email1 = models.EmailField("メール１", blank=True, null=True)
    phone = models.CharField("電話", max_length=50, blank=True, null=True)
    note = models.CharField("備考", max_length=250, blank=True, null=True)
    slug = models.CharField("スラグ", max_length=20, unique=True)

    def __str__(self):
        return self.short_name

    class Meta:
        ordering = ["name"]


class BMItem(models.Model):
    bm_work = models.CharField("項目", max_length=50)
    bm_work_sub = models.CharField(
        "補助項目", max_length=50, default="", blank=True, null=True
    )
    note = models.TextField("備考", blank=True, null=True)
    slug = models.CharField("スラグ", max_length=20, unique=True)

    def __str__(self):
        return self.bm_work

    class Meta:
        ordering = ["slug"]


class BMFieldSet(models.Model):
    bukken = models.ForeignKey(Bukken, verbose_name="物件", on_delete=models.CASCADE)
    bm_item = models.ForeignKey(BMItem, verbose_name="BM項目", on_delete=models.CASCADE)
    frequency = models.CharField("回数", max_length=50, blank=True, null=True)
    bm_plan = models.CharField("年度予定", max_length=50, blank=True, null=True)

    def __str__(self):
        return f"BM-{self.bukken}-{self.bm_item}"

    class Meta:
        ordering = ["bm_item__slug"]


class BMInputField(models.Model):
    bukken = models.ForeignKey(Bukken, verbose_name="物件", on_delete=models.CASCADE)
    bm_item = models.ForeignKey(BMItem, verbose_name="BM項目", on_delete=models.CASCADE)
    report_date = models.DateField(
        "レポート日",
    )
    frequency = models.CharField("回数", max_length=50, blank=True, null=True)
    bm_plan = models.CharField("年度予定", max_length=50, blank=True, null=True)
    bm_actual = models.CharField("実施日", max_length=50, blank=True, null=True)
    note = models.CharField("備考", max_length=250, blank=True, null=True)

    def __str__(self):
        return f"BM-{self.bukken}-{self.bm_item}-{self.report_date}"

    class Meta:
        ordering = ["bm_item__slug"]


class Expense(models.Model):
    bukken = models.ForeignKey(Bukken, verbose_name="物件", on_delete=models.CASCADE)
    subcontractor = models.ForeignKey(
        Subcontractor, verbose_name="協力会社", on_delete=models.CASCADE
    )
    account_code = models.ForeignKey(
        AccountCode, verbose_name="費用コード", on_delete=models.CASCADE
    )
    report_date = models.DateField(
        "レポート日",
    )
    start_date = models.DateField("対象開始時期", blank=True, null=True)
    end_date = models.DateField("対象終了時期", blank=True, null=True)
    invoice_date = models.DateField("請求日", blank=True, null=True)
    payment_date = models.DateField("支払日", blank=True, null=True)
    # tax_rate = models.ForeignKey(Tax, verbose_name='税率', on_delete=models.CASCADE, null=True, blank=True) # models.IntegerField(null=True, blank=True)
    payment_bt = models.IntegerField("支払額", default=0)
    payment_tax = models.IntegerField("税額", default=0)
    payment_at = models.IntegerField("税込支払額", default=0)
    note = models.CharField("備考", max_length=250, blank=True, null=True)

    def __str__(self):
        return f"Exp-{self.bukken}-{self.report_date}-{self.account_code}"

    class Meta:
        ordering = ["subcontractor", "account_code__slug"]


class ExpenseInputField(models.Model):
    subcontractor = models.ForeignKey(
        Subcontractor, verbose_name="協力会社", on_delete=models.CASCADE
    )
    bukken = models.ForeignKey(Bukken, verbose_name="物件", on_delete=models.CASCADE)
    account_code = models.ForeignKey(
        AccountCode, verbose_name="収入コード", on_delete=models.CASCADE
    )
    payment_bt = models.IntegerField("支払額", default=0)

    def __str__(self):
        return f"RevInput-{self.bukken}-{self.tenant}-{self.account_code}"

    class Meta:
        ordering = ["account_code__slug"]


class Contract(models.Model):
    tenant = models.ForeignKey(
        Tenant, verbose_name="テナント", on_delete=models.CASCADE
    )
    bukken = models.ForeignKey(Bukken, verbose_name="物件", on_delete=models.CASCADE)
    room_no = models.CharField("部屋番号", max_length=30, blank=True, null=True)
    contract_date = models.DateField(
        "契約日",
    )
    original_start_date = models.DateField(
        "当初賃貸開始日",
    )
    original_end_date = models.DateField(
        "当初賃貸終了日",
    )
    current_start_date = models.DateField("現在賃貸開始日", blank=True, null=True)
    current_end_date = models.DateField("現在賃貸終了日", blank=True, null=True)
    rent_bt = models.IntegerField("賃料", default=0)
    cam = models.IntegerField("共益費", default=0)
    contract_type = models.CharField("契約種類", max_length=50, default="普通")
    auto_renew = models.BooleanField("自動更新", default=True)
    contract_yr = models.IntegerField("契約年数", default=2)
    renewal = models.BooleanField("更新料", default=False)
    renewal_fee = models.IntegerField("更新料金額", default=0)
    cancel_notice_time = models.IntegerField("解約通知", default=6)
    room_type = models.CharField("居室タイプ", max_length=20, default="事務所")
    room_sqr = models.DecimalField(
        "居室面積㎡", max_digits=8, decimal_places=2, default=0.00
    )
    room_tb = models.DecimalField(
        "居室面積坪", max_digits=8, decimal_places=2, default=0.00
    )
    guarantor = models.ForeignKey(
        Guarantor, verbose_name="保証会社", on_delete=models.PROTECT
    )
    free_rent = models.CharField("フリーレント", max_length=250, blank=True, null=True)
    note = models.CharField("備考", max_length=250, blank=True, null=True)
    slug = models.CharField("スラグ", max_length=20, blank=True, null=True)
    is_active = models.BooleanField("退去済", default=False)

    def save(self, *args, **kwargs):
        """Override save method to delete old slugs and reassign new ones."""
        slug = f"{self.room_no}-{self.tenant.slug}-{self.bukken.id}"
        self.slug = slug

        super().save(*args, **kwargs)  # Call the original save method

    def __str__(self):
        return f"{self.tenant}-{self.bukken}-{self.room_no}"

    class Meta:
        ordering = ["slug"]


class Deposit(models.Model):
    contract = models.ForeignKey(
        Contract, verbose_name="契約", on_delete=models.CASCADE
    )
    tenant = models.ForeignKey(
        Tenant, verbose_name="テナント", on_delete=models.CASCADE
    )
    bukken = models.ForeignKey(Bukken, verbose_name="物件", on_delete=models.CASCADE)
    number_of_months = models.IntegerField("保証金月数", blank=True, null=True)
    balance = models.IntegerField("残高", blank=True, null=True)
    note = models.CharField("備考", max_length=250, blank=True, null=True)
    is_active = models.BooleanField("返済済", default=False)

    def __str__(self):
        return f"deposit-{self.bukken}-{self.tenant}"

    class Meta:
        ordering = ["tenant", "contract__room_no"]


class RevInputField(models.Model):
    tenant = models.ForeignKey(
        Tenant, verbose_name="テナント", on_delete=models.CASCADE
    )
    bukken = models.ForeignKey(Bukken, verbose_name="物件", on_delete=models.CASCADE)
    contract = models.ForeignKey(
        Contract, verbose_name="契約", on_delete=models.CASCADE
    )
    account_code = models.ForeignKey(
        AccountCode, verbose_name="収入コード", on_delete=models.CASCADE
    )
    revenue = models.IntegerField("賃料", default=0)

    def __str__(self):
        return f"RevInput-{self.bukken}-{self.tenant}-{self.account_code}"

    class Meta:
        ordering = ["tenant", "contract", "account_code__slug"]


class Revenue(models.Model):
    tenant = models.ForeignKey(
        Tenant, verbose_name="テナント", on_delete=models.CASCADE
    )
    bukken = models.ForeignKey(Bukken, verbose_name="物件", on_delete=models.CASCADE)
    contract = models.ForeignKey(
        Contract, verbose_name="契約", on_delete=models.CASCADE
    )
    account_code = models.ForeignKey(
        AccountCode, verbose_name="収入コード", on_delete=models.CASCADE
    )
    report_date = models.DateField(
        "レポート日",
    )
    start_date = models.DateField(
        "該当項目開始日",
    )
    end_date = models.DateField(
        "該当項目終了日",
    )
    invoice_date = models.DateField("請求日", blank=True, null=True)
    receipt_date = models.DateField("入金日", blank=True, null=True)
    revenue_bt = models.IntegerField("売上額", default=0)
    revenue_tax = models.IntegerField("税額", default=0)
    revenue_at = models.IntegerField("税込売上額", default=0)
    invoiceid = models.CharField(
        "請求書ID", max_length=30, default="", blank=True, null=True
    )
    invoice_processed = models.BooleanField(default=False)
    invoice_head_note = models.CharField(
        "請求書記載文", max_length=50, blank=True, null=True
    )
    note = models.CharField("備考", max_length=250, blank=True, null=True)

    def __str__(self):
        return f"Revenue-{self.bukken}-{self.tenant}-{self.account_code}"

    class Meta:
        ordering = ["-contract__room_no", "tenant", "account_code__slug"]


class InvoiceId(models.Model):
    invoiceid = models.CharField(
        "請求書ID", max_length=30, default="", blank=True, null=True, unique=True
    )
    revenue = models.ForeignKey(
        Revenue, verbose_name="売上", on_delete=models.CASCADE, related_name="invoices"
    )
    tenant = models.ForeignKey(
        Tenant, verbose_name="テナント", on_delete=models.CASCADE
    )
    bukken = models.ForeignKey(Bukken, verbose_name="物件", on_delete=models.CASCADE)
    room_no = models.CharField("部屋番号", max_length=30, blank=True, null=True)
    report_date = models.DateField(
        "レポート日",
    )
    revenue_bt_ttl_0 = models.IntegerField(
        "無税売上", default=0
    )  # 無税項目を追加 20250326
    revenue_bt_ttl = models.IntegerField("売上", default=0)
    tax_ttl = models.IntegerField("税金", default=0)
    revenue_at_ttl = models.IntegerField("税込売上", default=0)
    revenue_bt_gttl = models.IntegerField(
        "売上合計", default=0
    )  # 売上合計を追加 20250326
    revenue_tax_gttl = models.IntegerField(
        "合計税額", default=0
    )  # 売上合計を追加 20250326
    revenue_at_gttl = models.IntegerField(
        "税込売上合計", default=0
    )  # 税込売上合計を追加 20250326
    pdf_issued_date = models.DateField("PDF発行日", blank=True, null=True)
    mail_sent_date = models.DateField("メール送信日", blank=True, null=True)

    def __str__(self):
        return f"請求書ID-{self.invoiceid}"

    class Meta:
        ordering = ["-tenant__slug"]


class InvoiceTaxBreakdown(models.Model):
    invoice = models.ForeignKey(
        InvoiceId,
        verbose_name="請求書",
        on_delete=models.CASCADE,
        related_name="tax_breakdowns",
    )
    tax_rate = models.ForeignKey(
        Tax, verbose_name="税率", on_delete=models.CASCADE
    )  # models.ForeignKey(Tax, verbose_name='税率', on_delete=models.CASCADE) #  models.IntegerField(null=True, blank=True)  #
    revenue_bt = models.IntegerField("税抜売上", default=0)
    tax_amount = models.IntegerField("税額", default=0)
    revenue_at = models.IntegerField("税込売上", default=0)

    class Meta:
        unique_together = ("invoice", "tax_rate")  # 1 record per tax_rate per invoice

    def __str__(self):
        return f"{self.invoice.invoiceid} - {self.tax_rate.display_rate}"


class Status(models.Model):
    report_date = models.DateField(
        "レポート日",
    )
    bukken = models.ForeignKey(Bukken, verbose_name="物件", on_delete=models.CASCADE)
    new_tenant = models.TextField("新規テナント", blank=True, null=True)
    cur_tenant = models.TextField("テナント状況", blank=True, null=True)
    delinquent = models.TextField("遅延状況", blank=True, null=True)
    inspection = models.TextField("検査", blank=True, null=True)
    maintenance = models.TextField("メンテナンス", blank=True, null=True)
    special_item = models.TextField("特別事項", blank=True, null=True)
    others = models.TextField("備考", blank=True, null=True)

    def __str__(self):
        return f"ステータス-{self.report_date}"


"""
BROKER
"""


class Broker(models.Model):
    name = models.CharField("会社名", max_length=100)
    contact = models.CharField("BK担当者名", max_length=20)
    email = models.EmailField("BKEメール", blank=True, null=True)
    phone1 = models.CharField("電話番号", max_length=20, blank=True, null=True)
    phone2 = models.CharField("電話番号2", max_length=20, blank=True, null=True)
    address = models.CharField("住所", max_length=100, blank=True, null=True)
    short_name = models.CharField("短縮名", max_length=20, blank=True, null=True)

    def __str__(self):
        return self.short_name

    class Meta:
        ordering = ["name"]
