import { Routes, Route, Outlet } from "react-router-dom";
import { MainPage } from '../MainPage';
import { EditDialog } from '../components/editdialog'

const notePath = `note/:noteId`

export const RootRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<RootMainPage/>}>
                <Route index element={<></>} />
                <Route path={notePath} element={<EditDialog />} />
            </Route>
        </Routes> 
    )
}    

const RootMainPage: React.FC<{}> = () => <MainPage><Outlet /></MainPage>