import { useEffect, useState } from 'react';
import useGet from '../../../services/API/useGet';

const SuperDashboardContent = () => {
    const { get, loading, error } = useGet();
    const [Stats, setStats] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try{
                const result = await get('/api/super_admin/charity/beneficiary-in-charity');

                console.log(result);
                
                if(result){
                    setStats(result.report);
                }

            }catch(err){
                alert("Error :" + err);
            }
        }

        fetchData();
    }, []);
    return ( 
        <><h1>hello</h1></>
     );
}
 
export default SuperDashboardContent;