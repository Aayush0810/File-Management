import  SigninComponent  from "../Components/Signin";
import { Quote } from "../Components/Quote";

export const Signin = () => {
  return (
    <div className="overflow-y-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div>
          <SigninComponent />
        </div>
        <div className="hidden lg:block">
          <Quote />
        </div>
      </div>
    </div>
  );
};
