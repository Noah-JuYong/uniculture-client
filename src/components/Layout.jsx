import Header from "./Header/Header";

const Layout = (props) => {
    return (
        <>
            <Header />
            <div style={{backgroundColor: '#FBFBF3', height:'100vh-10px'}}>{props.children}</div>
        </>
    );
};

export default Layout;