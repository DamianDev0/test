import {routes} from './routes'
import { navBar } from './pages/components/navbar.page'

export function Router(){
    //obtenemos la ruta a la que el usuario esta intentando acceder

    const path = window.location.pathname
    const publicRoutes = routes.public.find((route) => route.path === path)
    const privateRoutes = routes.private.find((route) => route.path === path)
    const getRol = localStorage.getItem("role_id")



    if(path === "/login" || path === "/register"){
        const token = localStorage.getItem("token")

        if(token){
            navigateTo("/dashboard")
            return
        }
    }

    if(!getRol === 2){
        navigateTo("/not-found")
    }


    if(publicRoutes){
        publicRoutes.component()
        return
    }

    if(privateRoutes){
        if(!localStorage.getItem("token")){
            navigateTo("/login")
            return
        }
        const { $content, logic} = privateRoutes.component()
        navBar($content,logic)
        return
    }

    navigateTo("/not-found")

}

export function navigateTo(path) {
  window.history.pushState({}, "", window.location.origin + path);
  Router();
}
