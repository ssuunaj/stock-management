import Dashboard from "../modules/dashboard/Dashboard";
import Settings from "../modules/settings/Settings";
import UserSettings from "../modules/settings/UserSettings";
import Products from "../modules/Products/Products";
import Expenses from "../modules/Expenses/Expenses";
import Reports from "../modules/Reports/Reports";
import Stock from "../modules/stock/Stock";
import {MdDashboard} from "react-icons/md";
import {MdSettings} from "react-icons/md";
import {MdStackedBarChart} from "react-icons/md";
import {MdAssessment} from "react-icons/md";
import {MdDoDisturbOn} from "react-icons/md";



const routes = [
    {     
        name: "Dashboard",
        path: "/dashboard",
        component: <Dashboard />,
        icon: <MdDashboard />,
        subLink: null,
    },
    
    {     
        name: "Stock Management",
        path: "/stock",
        component: <Stock />,
        icon:<MdStackedBarChart  />,
        subLink: null,
    },

     {     
        name: "Products",
        path: "/products",
        component: <Products />,
        icon:<MdStackedBarChart  />,
        subLink: null,
    },
     {     
        name: "Expenses",
        path: "/expenses",
        component: <Expenses />,
        icon:<MdDoDisturbOn  />,
        subLink: null,
    },
    {     
        name: "Reports",
        path: "/reports",
        component: <Reports />,
        icon:<MdAssessment />,
        subLink: null,
    },

    {     
        name: "Settings",
        path: "/settings",
        component: <Settings />,
        icon: <MdSettings />,
        subLink: {
            name: "Settings",
            path: "/settings/userSettings",
            component: <UserSettings />,
        },
    },


]

export default routes;