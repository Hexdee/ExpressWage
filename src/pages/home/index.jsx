import { useNavigate } from 'react-router-dom';
import HomeLayout from '../../components/layouts/home-layout';
import { Button } from '../../components/ui/button';
import { PAYROLL_URL } from '../../config/paths';
import { useAccount } from 'wagmi';
import { CustomButton } from '../../components/ui/custom-button';
import { toast } from '../../components/ui/use-toast';


const Home = () => {
  const navigate = useNavigate();
  const { isConnected } = useAccount();

  const handleIndividual = () => {
    toast({
      title: 'Coming soon!!! 😎',
      description: 'We are working hard to get it done, check again few days time',
    });
  }
  
  return (
    <HomeLayout>
      <div className="grid md:grid-cols-2 gap-16 mt-8 items-center px-6 md:px-24 py-4">
        <div className="w-full text-center md:text-start">
          <h1 className="leading-[45px] md:leading-[80px] text-[40px] md:text-[70px] font-medium">
            Help simplify your payroll process
          </h1>
          <p className="mt-3 text-primary text-sm font-extralight px-6 md:px-0 md:w-[85%]">
            We make it easy for you to handle all of your payroll needs, from
            hiring employees to paying them and everything in between. Paying
            your family and friends.
          </p>

          <div className="flex mt-5 md:justify-start justify-center">
            {isConnected || (window.ethereum && window.ethereum.isMiniPay) ? (
              <Button
                className="h-[45px] px-8 bg-secondary text-white hover:bg-secondary"
                onClick={() => navigate(PAYROLL_URL)}
              >
                For organization
              </Button>
            ) : (
              <CustomButton
                chainStatus="none"
                btnLabel="Get started"
                className="h-[45px] px-8 bg-secondary text-white hover:bg-secondary"
              />
            )}

            {isConnected || (window.ethereum && window.ethereum.isMiniPay)? (
              <Button
                className="h-[45px] px-8 ml-8"
                onClick={handleIndividual}
              >
                For Individual
              </Button>
            ) : (
              <CustomButton chainStatus="none" className="h-[45px] px-8 ml-8" />
            )}
          </div>
        </div>
        <img src="/main-image.png" alt="pay roll" />
      </div>
      <img src="/section-two.png" alt="section two" className="" />

      <div className="bg-primary w-full h-[30px]" />
    </HomeLayout>
  );
};

export default Home;
