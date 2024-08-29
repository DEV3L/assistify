import { default as DashBoard } from "@/components/dashboard/Dashboard";
import withDashboardLayout from "@/components/layouts/withDashboardLayout";

const Dashboard = () => {
  return <DashBoard />;
};

export default withDashboardLayout(Dashboard);
