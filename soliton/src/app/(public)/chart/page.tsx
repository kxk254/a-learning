import BarChartOne from "@/src/components/charts/BarChartOne";
import LineChartOne from "@/src/components/charts/LineChartOne";
import Calendar from "@/src/components/calendar/Calendar";

export default function Chart() {
  return (
    <>
      <BarChartOne /> <LineChartOne />
      <Calendar />
    </>
  );
}
