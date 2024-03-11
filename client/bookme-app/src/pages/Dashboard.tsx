import { useAuth0 } from "@auth0/auth0-react";
import { APIMethods, useAPI } from "../hooks/useApi";
import { useEffect, useState } from "react";
import { PageLoader } from "../components/page-loader";
import { Navigate, useNavigate } from "react-router-dom";
import Toast from "../hooks/useToast";



export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const [businessAPI, businessResponse] = useAPI();
  const [serviceAPI, serviceResponse] = useAPI();
  const { user: authUser } = useAuth0();
  const [services, setServices] = useState<any[]>([]);
  const isLoading = businessResponse.loading && serviceResponse.loading
  const navigate = useNavigate();

  const getUser = async () => {
    if (businessAPI.businesses) {
      const businesses = businessAPI.businesses as APIMethods
      if (authUser?.sub) {
        await businesses.getOne(authUser.sub);
      }
      if (businessResponse.status === 204) {
        navigate('/BusinessInit');
      }
    }
  }

  const getServices = async () => {
    if (serviceAPI.businessServices) {
      const services = serviceAPI.businessServices as APIMethods
      if (authUser?.sub) {
        await services.getOne(authUser.sub);
        if (serviceResponse.status === 200) {
          setServices(serviceResponse.data);
        }
      }
    }
  }

  useEffect(() => {
    getUser();
  }, [])

  useEffect(() => {
    getServices();
  }, [businessResponse.status]);
    
    if (isLoading === true) {
      return <PageLoader />
    }

    return(
        <> 
            <div className="services-dashboard">
              <div className="services-header">
                <button><a href="/CreateService">Create Service</a></button>
              </div>
              {services.length === 0 ? <h2>You have not created any services. Create a service to manage them.</h2> : 
              <>
                <h2>Services</h2>
                {services.map((service, id) => (
                  <div key={id} className="service-card">
                    <h2>{service.name}</h2>
                    <p>{service.description}</p>
                  </div>
                ))}
              </>
              }
            </div>
        </>
    )
}