// import AdminLayout from "@/customComponents/jobs/layout/adminLayout";
// import JobsLayout from "@/customComponents/jobs/layout/layout";
// import Index from "@/pages/jobs/home/Index";
// import AddJobPage from "@/pages/jobs/addJob/Index";
// import AdminJobsManager from "@/pages/jobs/adminJobsView/Index";
// import EditJobPage from "@/pages/jobs/editJob/Index";
// import UserJobs from "@/pages/jobs/userJobs/Index";
// import TravelNavbar from "@/customComponents/travel/navbar";

// second project //

import AdminTravelLayout from "@/customComponents/travel/layout/adminLayout";
import { useRoutes } from "react-router-dom";
import MainAdminPage from "@/pages/travel/mainAdminPage/Index";
import AddFlightPage from "@/pages/travel/addFlight/Index";
import AddHotelPage from "@/pages/travel/addHotel/Index";
import AddCarsPage from "@/pages/travel/addCars/Index";
import AddUsers from "@/pages/travel/addUsers/Index";
import ManageUsers from "@/pages/travel/manageUsers/Index";
import UserLogin from "@/pages/travel/userLogin/Index";
import UserViewPage from "@/pages/travel/userViewPage/Index";
import BookingPage from "@/pages/travel/addBooking/Index";
import Payments from "@/pages/travel/payments/Index";

export default function Routes() {
  const element = useRoutes([
    {
      path: "/",
      element: <AdminTravelLayout />,
      children: [
        {
          path: "/",
          element: <MainAdminPage />,
        },
        {
          path: "/add-flights",
          element: <AddFlightPage />,
        },
        {
          path: "/add-hotels",
          element: <AddHotelPage />,
        },
        {
          path: "/add-cars",
          element: <AddCarsPage />,
        },
        {
          path: "/add-user",
          element: <AddUsers />,
        },
        {
          path: "/manage-users",
          element: <ManageUsers />,
        },
        {
          path: "/payments",
          element: <Payments />,
        },
        {
          path: "/user-login",
          element: <UserLogin />,
        },
      ],
    },

    {
      path: "/user-bookings",
      element: <UserViewPage />,
    },

    {
      path: "/book-your-need",
      element: <BookingPage />,
    },

    // second project //

    // {
    //   path: "/",
    //   element: <JobsLayout />,
    //   children: [
    //     {
    //       path: "/",
    //       element: <Index />,
    //     },
    //     {
    //       path: "/user/applications",
    //       element: <UserJobs />,
    //     },
    //   ],
    // },
    // {
    //   path: "/admin",
    //   element: <AdminLayout />,
    //   children: [
    //     {
    //       path: "add/job",
    //       element: <AddJobPage />,
    //     },
    //     {
    //       path: "manage/jobs",
    //       element: <AdminJobsManager />,
    //     },
    //     {
    //       path: "edit/job/:id",
    //       element: <EditJobPage />,
    //     },
    //   ],
    // },
    //  end of the first test case and start of the second test case
  ]);

  return element;
}
