---app ---layout.tsx
   @/context/SidebarContext'

   @/context/ThemeContext';


---app/(admin) ---page.tsx
   "@/components/ecommerce/EcommerceMetrics";
      ../ui/badge/Badge";
      @/icons";

   "@/components/ecommerce/MonthlyTarget";
      ../ui/dropdown/Dropdown";
      @/icons";
      ../ui/dropdown/DropdownItem";


   "@/components/ecommerce/MonthlySalesChart";
      ../ui/dropdowcn/DropdownItem
      ../ui/dropdowcn/Dropdown

   "@/components/ecommerce/StatisticsChart";
      ../common/ChartTab";


   "@/components/ecommerce/RecentOrders";
      ../ui/table";
      ../ui/badge/Badge"; 


   "@/components/ecommerce/DemographicCard";
      @/icons";
      ../ui/dropdown/Dropdown";
      ../ui/dropdown/DropdownItem";

---app/(admin)  --layout.tsx 
   @/context/SidebarContext";
    none

   @/layout/AppHeader";
     @/components/common/ThemeToggleButton";
     @/components/header/NotificationDropdown";
     @/components/header/UserDropdown";
     @/context/SidebarContext";

   @/layout/AppSidebar";
     next/navigation";
     ../context/SidebarContext";
     ../icons/index";
     ./SidebarWidget";

   @/layout/Backdrop";
     @/context/SidebarContext";

---app/(admin)/(others-pages)/(chart)
   ----(barchart)/page.tsx
     @/components/charts/bar/BarChartOne";
     @/components/common/ComponentCard";
     @/components/common/PageBreadCrumb";

   -----(linechart)/page.tsx
     @/components/charts/line/LineChartOne";
     @/components/common/ComponentCard";
     @/components/common/PageBreadCrumb";

---app/(admin)/(others-pages)/(forms)/from-elements
     @/components/common/PageBreadCrumb";
     @/components/form/form-elements/CheckboxComponents";
       ../../common/ComponentCard";
       ../input/Checkbox";

     @/components/form/form-elements/DefaultInputs";
       ../../common/ComponentCard";

     @/components/form/form-elements/DropZone";
       ../../common/ComponentCard";

     @/components/form/form-elements/FileInputExample";
       ../../common/ComponentCard";
       ../input/FileInput";

     @/components/form/form-elements/InputGroup";
       ../../common/ComponentCard";
       ../Label";
       ../input/InputField";
       ../../../icons";
       ../group-input/PhoneInput";

     @/components/form/form-elements/InputStates";
       ../../common/ComponentCard";
       ../input/InputField";
       ../Label";

     @/components/form/form-elements/RadioButtons";
       ../../common/ComponentCard";
       ../input/Radio";


     @/components/form/form-elements/SelectInputs";
       ../../common/ComponentCard";
       ../Label";
       ../Select";
       ../MultiSelect";


     @/components/form/form-elements/TextAreaInput";
       ../../common/ComponentCard";
       ../input/TextArea";
       ../Label";

     @/components/form/form-elements/ToggleSwitch";
       ../../common/ComponentCard";
       ../switch/Switch";

---app/(admin)/(others-pages)/(tables)/basic-tables
     @/components/common/ComponentCard";
     @/components/common/PageBreadCrumb";
     @/components/tables/BasicTableOne";
       ../ui/table";
       ../ui/badge/Badge";

---app/(admin)/(others-pages)/(blank)
     @/components/common/PageBreadCrumb";

---app/(admin)/(others-pages)/(calender)
     @/components/calendar/Calendar";
       @/hooks/useModal";
       @/components/ui/modal";

     @/components/common/PageBreadCrumb";

---app/(admin)/(others-pages)/(profile)
     @/components/user-profile/UserAddressCard";
       ../../hooks/useModal";
       ../ui/modal";
       ../ui/button/Button";
       ../form/input/InputField";
       ../form/Label";

     @/components/user-profile/UserInfoCard";
       ../../hooks/useModal";
       ../ui/modal";
       ../ui/button/Button";
       ../form/input/InputField";
       ../form/Label";

     @/components/user-profile/UserMetaCard";
       ../../hooks/useModal";
       ../ui/modal";
       ../ui/button/Button";
       ../form/input/InputField";
       ../form/Label";


---app/(admin)/(ui-elements)/alerts
     @/components/common/ComponentCard";
     @/components/common/PageBreadCrumb";
     @/components/ui/alert/Alert";

---app/(admin)/(ui-elements)/avatars
     @/components/common/ComponentCard";
     @/components/common/PageBreadCrumb";
     @/components/ui/avatar/Avatar";

---app/(admin)/(ui-elements)/badge
     @/components/common/PageBreadCrumb";
     @/components/ui/badge/Badge";

---app/(admin)/(ui-elements)/buttons
     @/components/common/ComponentCard";
     @/components/common/PageBreadCrumb";
     @/components/ui/button/Button";

---app/(admin)/(ui-elements)/images
     @/components/common/ComponentCard";
     @/components/common/PageBreadCrumb";
     @/components/ui/images/ResponsiveImage";
     @/components/ui/images/ThreeColumnImageGrid";
     @/components/ui/images/TwoColumnImageGrid";

---app/(admin)/(ui-elements)/modals
     @/components/common/PageBreadCrumb";
     @/components/example/ModalExample/DefaultModal";
       ../../common/ComponentCard";

     @/components/example/ModalExample/FormInModal";
       ../../common/ComponentCard";
       ../../ui/button/Button";
       ../../ui/modal";
       ../../form/Label";
       ../../form/input/InputField";
       @/hooks/useModal";

     @/components/example/ModalExample/FullScreenModal";
       @/hooks/useModal";
       ../../common/ComponentCard";
       ../../ui/button/Button";
       ../../ui/modal";

     @/components/example/ModalExample/ModalBasedAlerts";
       @/hooks/useModal";
       ../../common/ComponentCard";
       ../../ui/modal";

     @/components/example/ModalExample/VerticallyCenteredModal";
       @/hooks/useModal";
       ../../common/ComponentCard";
       ../../ui/button/Button";
       ../../ui/modal";

---app/(admin)/(ui-elements)/videos
     @/components/common/PageBreadCrumb";

     @/components/ui/video/VideosExample";
        ./YouTubeEmbed";
        @/components/common/ComponentCard";

---app/(full-width-pages)/(auth)/signin
     @/components/auth/SignInForm";
       @/components/form/input/Checkbox";
       @/components/form/input/InputField";
       @/components/form/Label";
       @/components/ui/button/Button";

---app/(full-width-pages)/(auth)/layout 
     @/components/common/GridShape";
     @/components/common/ThemeTogglerTwo";
     @/context/ThemeContext";

---app/(full-width-pages)/(auth)/signup
     @/components/auth/SignUpForm";
       @/components/form/input/Checkbox";
       @/components/form/input/InputField";
       @/components/form/Label";


---app/(full-width-pages)/(error-pges)
     @/components/common/GridShape";
