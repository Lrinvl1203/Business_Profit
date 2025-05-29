// Temporary change to trigger Netlify deploy
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Container, Grid, Paper, Typography, TextField, Box, Button } from '@mui/material';
import { Bar, Line } from 'react-chartjs-2';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { LanguageProvider, useLanguage } from './LanguageContext';
import LanguageSelector from './components/LanguageSelector';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

function AppContent() {
  const { t } = useLanguage();
  const [inputs, setInputs] = useState({
    averagePrice: 3000,
    dailySales: 50,
    materialCost: 500,
    monthlyManagementCost: 1000000,
    loanPrincipal: 30000000,
    loanInterest: 5,
    initialInvestment: 50000000,
  });

  const [scenarios, setScenarios] = useState({
    case2: 10,
    case3: 30,
  });

  const [results, setResults] = useState({
    case1: {},
    case2: {},
    case3: {},
  });

  const contentRef = useRef(null);

  const formatNumber = (num) => {
    if (num === null || num === undefined) return '0'; // Handle null or undefined
    const currency = t('currency');
    const formattedNum = num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    
    // 통화 표시 형식 설정
    if (currency === '원') {
      return `${formattedNum}${currency}`;
    } else if (currency === '円') {
      return `${formattedNum}${currency}`;
    } else {
      return `${currency} ${formattedNum}`;
    }
  };

  // 차트 데이터는 환율 적용 없이 원본 숫자 사용
  const formatChartNumber = (num) => {
    return num;
  };

  const getEmoji = (years, months) => {
    const totalMonths = years * 12 + months;
    const targetMonths = 24; // 2년
    const threshold = targetMonths * 0.2; // 20% 기준

    if (totalMonths < targetMonths) {
      return '😄'; // 2년 미만
    } else if (Math.abs(totalMonths - targetMonths) <= threshold) {
      return '🙂'; // 2년 ±20% 내
    } else {
      return '😢'; // 2년보다 20% 초과
    }
  };

  const calculateResults = useCallback(() => {
    // Case 1 (기본)
    const case1 = {
      monthlySales: inputs.averagePrice * ((inputs.dailySales * 22) + (inputs.dailySales * 1.1 * 8)),
      monthlyTotalExpenses: (inputs.materialCost * ((inputs.dailySales * 22) + (inputs.dailySales * 1.1 * 8))) +
        inputs.monthlyManagementCost + (inputs.loanPrincipal * (inputs.loanInterest / 100) / 12),
    };

    // Case 2 (사용자 지정 % 증가)
    const case2 = {
      monthlySales: inputs.averagePrice * ((inputs.dailySales * (1 + scenarios.case2/100) * 22) + 
        (inputs.dailySales * (1 + scenarios.case2/100) * 1.1 * 8)),
      monthlyTotalExpenses: (inputs.materialCost * ((inputs.dailySales * (1 + scenarios.case2/100) * 22) + 
        (inputs.dailySales * (1 + scenarios.case2/100) * 1.1 * 8))) +
        inputs.monthlyManagementCost + (inputs.loanPrincipal * (inputs.loanInterest / 100) / 12),
    };

    // Case 3 (사용자 지정 % 증가)
    const case3 = {
      monthlySales: inputs.averagePrice * ((inputs.dailySales * (1 + scenarios.case3/100) * 22) + 
        (inputs.dailySales * (1 + scenarios.case3/100) * 1.1 * 8)),
      monthlyTotalExpenses: (inputs.materialCost * ((inputs.dailySales * (1 + scenarios.case3/100) * 22) + 
        (inputs.dailySales * (1 + scenarios.case3/100) * 1.1 * 8))) +
        inputs.monthlyManagementCost + (inputs.loanPrincipal * (inputs.loanInterest / 100) / 12),
    };

    setResults({ case1, case2, case3 });
  }, [inputs, scenarios]);

  useEffect(() => {
    calculateResults();
  }, [calculateResults]);

  const handleInputChange = (field) => (event) => {
    const value = event.target.value === '' ? '' : Number(event.target.value);
    setInputs({
      ...inputs,
      [field]: value,
    });
  };

  const exportToPDF = async () => {
    if (contentRef.current) {
      const canvas = await html2canvas(contentRef.current);
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('비즈니스_수익성_분석.pdf');
    }
  };

  const exportToJPG = async () => {
    if (contentRef.current) {
      const canvas = await html2canvas(contentRef.current);
      const imgData = canvas.toDataURL('image/jpeg', 1.0);
      const link = document.createElement('a');
      link.href = imgData;
      link.download = '비즈니스_수익성_분석.jpg';
      link.click();
    }
  };

  const barChartData = {
    labels: [t('basicScenario'), `${scenarios.case2}% ${t('increase')}`, `${scenarios.case3}% ${t('increase')}`],
    datasets: [
      {
        label: t('monthlySales'),
        data: [
          results.case1.monthlySales || 0,
          results.case2.monthlySales || 0,
          results.case3.monthlySales || 0
        ],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
      {
        label: t('monthlyTotalExpenses'),
        data: [
          results.case1.monthlyTotalExpenses || 0,
          results.case2.monthlyTotalExpenses || 0,
          results.case3.monthlyTotalExpenses || 0
        ],
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
      },
    ],
  };

  const lineChartData = {
    labels: [t('basicScenario'), `${scenarios.case2}% ${t('increase')}`, `${scenarios.case3}% ${t('increase')}`],
    datasets: [
      {
        label: t('monthlyNetProfit'),
        data: [
          (results.case1.monthlySales || 0) - (results.case1.monthlyTotalExpenses || 0),
          (results.case2.monthlySales || 0) - (results.case2.monthlyTotalExpenses || 0),
          (results.case3.monthlySales || 0) - (results.case3.monthlyTotalExpenses || 0),
        ],
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  const combinedChartData = {
    labels: [t('basicScenario'), `${scenarios.case2}% ${t('increase')}`, `${scenarios.case3}% ${t('increase')}`],
    datasets: [
      {
        type: 'bar',
        label: t('monthlySales'),
        data: [
          results.case1.monthlySales || 0,
          results.case2.monthlySales || 0,
          results.case3.monthlySales || 0
        ],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        yAxisID: 'y',
      },
      {
        type: 'bar',
        label: t('monthlyTotalExpenses'),
        data: [
          results.case1.monthlyTotalExpenses || 0,
          results.case2.monthlyTotalExpenses || 0,
          results.case3.monthlyTotalExpenses || 0
        ],
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
        yAxisID: 'y',
      },
      {
        type: 'line',
        label: t('monthlyNetProfit'),
        data: [
          (results.case1.monthlySales || 0) - (results.case1.monthlyTotalExpenses || 0),
          (results.case2.monthlySales || 0) - (results.case2.monthlyTotalExpenses || 0),
          (results.case3.monthlySales || 0) - (results.case3.monthlyTotalExpenses || 0),
        ],
        borderColor: 'rgb(153, 102, 255)',
        tension: 0.1,
        yAxisID: 'y1',
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    animation: {
      duration: 800,
    },
    plugins: {
      legend: {
        position: 'top',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  const renderInputSection = (title, fields) => (
    <Paper 
      sx={{ 
        p: { xs: 2, md: 3 },
        mb: 2, 
        borderRadius: 2,
        boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
      }}
    >
      <Typography variant="h6" gutterBottom sx={{ color: '#1d1d1f', fontWeight: 500 }}>
        {title}
      </Typography>
      <Grid container spacing={2}>
        {fields.map((field) => (
          <Grid item xs={12} sm={6} key={field}>
            <TextField
              fullWidth
              label={t(`fields.${field}`)}
              type="number"
              value={inputs[field]}
              onChange={handleInputChange(field)}
              variant="outlined"
              size="small"
              inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
              InputProps={{
                endAdornment: field === 'loanInterest' ? '%' : null,
                readOnly: false,
                sx: {
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'rgba(0, 0, 0, 0.1)',
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'rgba(0, 0, 0, 0.2)',
                  },
                },
              }}
              InputLabelProps={{
                shrink: true,
                sx: { color: '#1d1d1f' },
              }}
              FormHelperTextProps={{
                sx: { textAlign: 'right', color: '#86868b' }
              }}
              helperText={field !== 'loanInterest' && field !== 'dailySales' ? formatNumber(inputs[field]) : null}
            />
          </Grid>
        ))}
      </Grid>
    </Paper>
  );

  return (
    <Container maxWidth="xl" sx={{ mt: 2, mb: 2, height: '100vh' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: { xs: 'center', md: 'center' }, flexDirection: { xs: 'column', md: 'row' }, mb: 2 }}>
        <Typography 
          variant="h4" 
          component="h1" 
          sx={{ 
            color: '#1d1d1f',
            fontWeight: 600,
            fontSize: { xs: '1.5rem', md: '2rem' },
            textAlign: 'center',
            mb: { xs: 2, md: 0 }
          }}
        >
          {t('title')}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: { xs: 'center', md: 'flex-end' } }}>
          <Button 
            variant="contained" 
            onClick={exportToPDF}
            sx={{
              backgroundColor: '#0071e3',
              '&:hover': {
                backgroundColor: '#0077ed',
              },
              borderRadius: 2,
              textTransform: 'none',
              px: 3,
              mr: 1,
            }}
          >
            {t('saveAsPDF')}
          </Button>
          <Button 
            variant="contained" 
            onClick={exportToJPG}
            sx={{
              backgroundColor: '#0071e3',
              '&:hover': {
                backgroundColor: '#0077ed',
              },
              borderRadius: 2,
              textTransform: 'none',
              px: 3,
              mr: 1,
            }}
          >
            {t('saveAsJPG')}
          </Button>
          <LanguageSelector />
        </Box>
      </Box>

      <div ref={contentRef}>
        <Grid container spacing={2} sx={{ height: { xs: 'auto', md: 'calc(100vh - 120px)' }, flexDirection: { xs: 'column', md: 'row' } }}>
          {/* Left Side - Input Section */}
          <Grid item xs={12} md={5}>
            <Paper 
              sx={{ 
                p: { xs: 2, md: 3 },
                height: { xs: 'auto', md: '100%' },
                borderRadius: 2,
                boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                overflow: 'auto',
              }}
            >
              <Typography variant="h6" gutterBottom sx={{ color: '#1d1d1f', fontWeight: 500 }}>
                {t('salesIncreaseScenario')}
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label={t('case2Increase')}
                    type="number"
                    value={scenarios.case2}
                    onChange={e => setScenarios({ ...scenarios, case2: Number(e.target.value) })}
                    variant="outlined"
                    size="small"
                    inputProps={{ min: 0, max: 50, inputMode: 'numeric', pattern: '[0-9]*' }}
                    InputLabelProps={{ shrink: true }}
                    helperText={t('increaseRateHelp')}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label={t('case3Increase')}
                    type="number"
                    value={scenarios.case3}
                    onChange={e => setScenarios({ ...scenarios, case3: Number(e.target.value) })}
                    variant="outlined"
                    size="small"
                    inputProps={{ min: 0, max: 50, inputMode: 'numeric', pattern: '[0-9]*' }}
                    InputLabelProps={{ shrink: true }}
                    helperText={t('increaseRateHelp')}
                  />
                </Grid>
              </Grid>

              {renderInputSection(t('mainOperatingCosts'), [
                'averagePrice',
                'dailySales',
                'materialCost',
                'monthlyManagementCost',
              ])}
              {renderInputSection(t('initialInvestment'), [
                'loanPrincipal',
                'loanInterest',
                'initialInvestment',
              ])}
            </Paper>
          </Grid>

          {/* Right Side - Results Section */}
          <Grid item xs={12} md={7}>
            <Grid container spacing={2} sx={{ height: '100%', flexDirection: { xs: 'column', md: 'row' } }}>
              {/* Text Results Section (모바일 상단) */}
              <Grid item xs={12} sx={{ display: { xs: 'block', md: 'none' } }}>
                <Paper
                  sx={{
                    p: 2,
                    mb: 2,
                    borderRadius: 2,
                    boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  }}
                >
                  <Typography variant="h6" gutterBottom sx={{ color: '#1d1d1f', fontWeight: 500 }}>
                    {t('analysisResults')}
                  </Typography>
                  {['case1', 'case2', 'case3'].map((case_, index) => {
                    const monthlyProfit = results[case_].monthlySales - results[case_].monthlyTotalExpenses;
                    return (
                      <Box key={case_} sx={{ mb: 1 }}>
                        <Typography variant="subtitle2" sx={{ color: '#1d1d1f', fontWeight: 500, fontSize: 14 }}>
                          {index === 0 ? t('basicScenario') : `Case ${index + 1} (${scenarios[case_]}% ${t('increase')})`}
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#1d1d1f' }}>
                          {t('monthlySales')}: {formatNumber(results[case_].monthlySales || 0)}
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#1d1d1f' }}>
                          {t('monthlyTotalExpenses')}: {formatNumber(results[case_].monthlyTotalExpenses || 0)}
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#1d1d1f', fontWeight: 600 }}>
                          {t('monthlyNetProfit')}: {formatNumber(monthlyProfit || 0)}
                        </Typography>
                      </Box>
                    );
                  })}
                </Paper>
              </Grid>

              {/* Charts Section */}
              <Grid item xs={12} sx={{ height: { xs: 'auto', md: '60%' } }}>
                <Paper 
                  sx={{ 
                    p: { xs: 2, md: 3 },
                    height: '100%',
                    borderRadius: 2,
                    boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row' },
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: { xs: 3, md: 2 },
                  }}
                >
                  <Box sx={{ width: { xs: '100%', md: '50%' }, height: { xs: 200, md: 240 } }}>
                    <Typography variant="subtitle1" sx={{ color: '#1d1d1f', mb: 1, fontSize: { xs: 14, md: 15 } }}>
                      {t('monthlySalesAndExpenses')}
                    </Typography>
                    <Bar data={barChartData} options={{ ...chartOptions, plugins: { ...chartOptions.plugins, legend: { display: false } }, maintainAspectRatio: false, aspectRatio: 1.2, }} />
                  </Box>
                  <Box sx={{ width: { xs: '100%', md: '50%' }, height: { xs: 200, md: 240 } }}>
                    <Typography variant="subtitle1" sx={{ color: '#1d1d1f', mb: 1, fontSize: { xs: 14, md: 15 } }}>
                      {t('monthlyNetProfitTrend')}
                    </Typography>
                    <Line data={lineChartData} options={{ ...chartOptions, plugins: { ...chartOptions.plugins, legend: { display: false } }, maintainAspectRatio: false, aspectRatio: 1.2, }} />
                  </Box>
                </Paper>
              </Grid>

              {/* Investment Recovery Period + 통합분석 */}
              <Grid item xs={12} sx={{ height: { xs: 'auto', md: '40%' } }}>
                <Paper 
                  sx={{ 
                    p: { xs: 2, md: 3 },
                    height: '100%',
                    borderRadius: 2,
                    boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row' },
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: { xs: 3, md: 2 },
                  }}
                >
                  <Box sx={{ width: { xs: '100%', md: '55%' }, height: { xs: 200, md: 180 }, display: { xs: 'none', md: 'block' } }}>
                    <Typography variant="subtitle1" sx={{ color: '#1d1d1f', mb: 1, fontSize: 15 }}>
                      {t('integratedAnalysis')}
                    </Typography>
                    <Bar data={combinedChartData} options={{ ...chartOptions, plugins: { ...chartOptions.plugins, legend: { display: false } }, maintainAspectRatio: false, aspectRatio: 1.2, }} />
                  </Box>
                  <Box sx={{ width: { xs: '100%', md: '45%' }, height: { xs: 'auto', md: 180 }, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <Typography variant="subtitle1" sx={{ color: '#1d1d1f', mb: 1, fontSize: 15 }}>
                      {t('investmentRecoveryPeriod')}
                    </Typography>
                    <Grid container spacing={1}>
                      {['case1', 'case2', 'case3'].map((case_, index) => {
                        const monthlyProfit = results[case_].monthlySales - results[case_].monthlyTotalExpenses;
                        const monthsToRecover = monthlyProfit > 0 ? inputs.initialInvestment / monthlyProfit : Infinity;
                        const years = isFinite(monthsToRecover) ? Math.floor(monthsToRecover / 12) : 'N/A';
                        const months = isFinite(monthsToRecover) ? Math.round(monthsToRecover % 12) : 'A';
                        const emoji = isFinite(monthsToRecover) ? getEmoji(years, months) : '🤔';

                        return (
                          <Grid item xs={12} sm={4} key={case_}>
                            <Paper sx={{ p: 1, bgcolor: 'rgba(255,255,255,0.95)', borderRadius: 2, boxShadow: '0 2px 8px rgba(0,0,0,0.05)', textAlign: 'center' }}>
                              <Typography variant="subtitle2" sx={{ color: '#1d1d1f', fontWeight: 500, fontSize: 14 }}>
                                {index === 0 ? t('basicScenario') : `${scenarios[case_]}% ${t('increase')}`}
                              </Typography>
                              <Typography sx={{ color: '#1d1d1f', fontSize: '1.1rem', mt: 0.5 }}>
                                {isFinite(monthsToRecover) 
                                  ? `${years}${t('years')} ${months}${t('months')}` 
                                  : t('calculationNotPossible')} {emoji}
                              </Typography>
                            </Paper>
                          </Grid>
                        );
                      })}
                    </Grid>
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </Container>
  );
}

function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}

export default App; 