/* eslint-disable react/prop-types */
import Navbar from "../nav-bar";

const HomeLayout = ({ children }) => {
    return (
        <div>
            <main className="px-6 md:px-12 py-4">
                <Navbar />
            </main>

            {children}
        </div>
    )
};

export default HomeLayout;
