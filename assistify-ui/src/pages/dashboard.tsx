import MainContent from "@/components/dashboard/MainContent";
import withDashboardLayout from "@/components/layouts/withDashboardLayout";

const Dashboard = () => {
  return <MainContent drawerWidth={0} />;
};

export default withDashboardLayout(Dashboard);
