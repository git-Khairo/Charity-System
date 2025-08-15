import { useState, useEffect, useCallback } from 'react';
import useGet from '../../../services/API/useGet';
import usePost from '../../../services/API/usePost';

export const useFetchCharityDashboardData = (selectedYear) => {
    const { get, loading: getLoading, error: getError } = useGet();
    const { post, loading: postLoading, error: postError } = usePost();

    // Format monthly data object -> array of 12 months
    const formatMonthlyData = (monthlyObj) =>
        Array.from({ length: 12 }, (_, i) => monthlyObj?.[i + 1] ?? 0);

    // Default chart styles
    const chartDefaults = {
        Volunteers: {
            label: 'Volunteers',
            borderColor: 'rgb(79, 70, 229)',
            backgroundColor: null,
            pointBackgroundColor: 'rgb(79, 70, 229)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgb(79, 70, 229)',
            tension: 0.4,
            fill: true,
            borderWidth: 2,
            hidden: false,
        },
        Donors: {
            label: 'Donors',
            borderColor: 'rgb(34, 197, 94)',
            backgroundColor: null,
            pointBackgroundColor: 'rgb(34, 197, 94)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgb(34, 197, 94)',
            tension: 0.4,
            fill: true,
            borderWidth: 2,
            hidden: false,
        },
        Beneficiaries: {
            label: 'Beneficiaries',
            borderColor: 'rgb(239, 68, 68)',
            backgroundColor: null,
            pointBackgroundColor: 'rgb(239, 68, 68)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgb(239, 68, 68)',
            tension: 0.4,
            fill: true,
            borderWidth: 2,
            hidden: true,
        },
    };

    const [chartData, setChartData] = useState({
        Volunteers: { ...chartDefaults.Volunteers, data: [] },
        Donors: { ...chartDefaults.Donors, data: [] },
        Beneficiaries: { ...chartDefaults.Beneficiaries, data: [] },
    });

    const [metrics, setMetrics] = useState({
        totalVolunteers: { value: 0 },
        totalDonors: { value: 0 },
        totalBeneficiaries: { value: 0 },
        totalDonations: { value: 0 },
    });

    const [checkboxes, setCheckboxes] = useState({
        Volunteers: true,
        Donors: true,
        Beneficiaries: false,
    });

    const [fetchError, setFetchError] = useState(null);

    const fetchDashboardData = useCallback(async () => {
        try {
            const [volunteersRes, donorsRes, beneficiariesRes, charityInfoRes] = await Promise.all([
                post('/api/admin/charity/volunteer-in-events', { year: selectedYear }),
                post('/api/admin/charity/donorsChart', { year: selectedYear }),
                post('/api/admin/charity/beneficiary-in-charity', { year: selectedYear }),
                get('/api/admin/charity/charity-info'),
            ]);

            // Set chart data
            setChartData({
                Volunteers: {
                    ...chartDefaults.Volunteers,
                    data: formatMonthlyData(volunteersRes?.report?.original?.monthly_accepted_volunteers),
                },
                Donors: {
                    ...chartDefaults.Donors,
                    data: formatMonthlyData(donorsRes?.report),
                },
                Beneficiaries: {
                    ...chartDefaults.Beneficiaries,
                    data: formatMonthlyData(beneficiariesRes?.report?.original?.monthly_accepted_requests),
                },
            });

            // Set metrics
            setMetrics({
                totalVolunteers: { value: charityInfoRes?.report?.report?.total_volunteers ?? 0 },
                totalDonors: { value: Array.isArray(charityInfoRes?.report?.report?.total_donors)
                        ? charityInfoRes.report.report.total_donors.length
                        : 0 },
                totalBeneficiaries: { value: charityInfoRes?.report?.report?.total_beneficiaries ?? 0 },
                totalDonations: { value: charityInfoRes?.report?.report?.total_donation_amount ?? 0 },
            });

            setFetchError(null);
        } catch (err) {
            setFetchError(err.message);
            setChartData({
                Volunteers: { ...chartDefaults.Volunteers, data: [] },
                Donors: { ...chartDefaults.Donors, data: [] },
                Beneficiaries: { ...chartDefaults.Beneficiaries, data: [] },
            });
            setMetrics({
                totalVolunteers: { value: 0 },
                totalDonors: { value: 0 },
                totalBeneficiaries: { value: 0 },
                totalDonations: { value: 0 },
            });
        }
    }, [selectedYear]);

    useEffect(() => {
        fetchDashboardData();
    }, [fetchDashboardData]);

    return {
        setChartData,
        chartData,
        metrics,
        checkboxes,
        setCheckboxes,
        loading: getLoading || postLoading,
        error: fetchError || getError || postError,
        fetchDashboardData,
    };
};
