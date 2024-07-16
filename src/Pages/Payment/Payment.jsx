import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import PackagePrice from "../../Components/PackagePrice";

const Payment = () => {
  const { packageName } = useParams();

  let totalPrice;
  let member;

  switch (packageName) {
    case "basic":
      totalPrice = 5;
      member = 5;
      break;
    case "standard":
      totalPrice = 8;
      member = 10;
      break;
    case "premium":
      totalPrice = 15;
      member = 20;
      break;
    default:
      totalPrice = 0;
      member = 0;
      break;
  }

  return (
    <div className="my-5">
      <Helmet>
        <title>Payment - {packageName.toUpperCase()}</title>
      </Helmet>
      <PackagePrice
        packageName={packageName}
        totalPrice={totalPrice}
        member={member}
      ></PackagePrice>
    </div>
  );
};

export default Payment;
