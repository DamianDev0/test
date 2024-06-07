import { NotFound } from "./pages/not-found";
import { Allfligths } from "./pages/private/all-fligths/all-fligths.page";
import { Dashboard } from "./pages/private/dashboard";
import { DashboardAdmin } from "./pages/private/dashboardAdmin";
import { CreateFligth } from "./pages/private/dashboardAdmin/admin.create";
import { EditFligth } from "./pages/private/dashboardAdmin/admin.edit";
import { LoginPage } from "./pages/public/login";
import { RegisterPage } from "./pages/public/register";



export const routes = {
    public : [
        {path: '/login', component: LoginPage},
        {path: '/not-found', component: NotFound},
        {path: '/register' ,component: RegisterPage}

    ],
    private : [
        {path: '/dashboard' ,component: Dashboard},
        {path : '/dashboard/admin', component: DashboardAdmin},
        {path : '/dashboard/allfligths', component: Allfligths},
        {path: '/dashboard/flights/edit', component:EditFligth},
        {path: '/dashboard/flights/create', component: CreateFligth },
    ]
}