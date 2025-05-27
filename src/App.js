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

function App() {
  const [inputs, setInputs] = useState({
    평단가: 3000,
    일매출수: 50,
    원재료비: 1000,
    월관리비: 2500000,
    대출원금: 30000000,
    대출이자: 5,
    초기투자금: 50000000,
  });

  const [scenarios, setScenarios] = useState({
    case2: 10,
    case3: 20,
  });

  const [results, setResults] = useState({
    case1: {},
    case2: {},
    case3: {},
  });

  const contentRef = useRef(null);

  const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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
      월매출: inputs.평단가 * ((inputs.일매출수 * 22) + (inputs.일매출수 * 1.1 * 8)),
      월총지출: (inputs.원재료비 * ((inputs.일매출수 * 22) + (inputs.일매출수 * 1.1 * 8))) +
        inputs.월관리비 + (inputs.대출원금 * (inputs.대출이자 / 100) / 12),
    };

    // Case 2 (사용자 지정 % 증가)
    const case2 = {
      월매출: inputs.평단가 * ((inputs.일매출수 * (1 + scenarios.case2/100) * 22) + 
        (inputs.일매출수 * (1 + scenarios.case2/100) * 1.1 * 8)),
      월총지출: (inputs.원재료비 * ((inputs.일매출수 * (1 + scenarios.case2/100) * 22) + 
        (inputs.일매출수 * (1 + scenarios.case2/100) * 1.1 * 8))) +
        inputs.월관리비 + (inputs.대출원금 * (inputs.대출이자 / 100) / 12),
    };

    // Case 3 (사용자 지정 % 증가)
    const case3 = {
      월매출: inputs.평단가 * ((inputs.일매출수 * (1 + scenarios.case3/100) * 22) + 
        (inputs.일매출수 * (1 + scenarios.case3/100) * 1.1 * 8)),
      월총지출: (inputs.원재료비 * ((inputs.일매출수 * (1 + scenarios.case3/100) * 22) + 
        (inputs.일매출수 * (1 + scenarios.case3/100) * 1.1 * 8))) +
        inputs.월관리비 + (inputs.대출원금 * (inputs.대출이자 / 100) / 12),
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
    labels: ['기본', `${scenarios.case2}% 증가`, `${scenarios.case3}% 증가`],
    datasets: [
      {
        label: '월 매출',
        data: [results.case1.월매출, results.case2.월매출, results.case3.월매출],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
      {
        label: '월 총 지출',
        data: [results.case1.월총지출, results.case2.월총지출, results.case3.월총지출],
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
      },
    ],
  };

  const lineChartData = {
    labels: ['기본', `${scenarios.case2}% 증가`, `${scenarios.case3}% 증가`],
    datasets: [
      {
        label: '월 순이익',
        data: [
          results.case1.월매출 - results.case1.월총지출,
          results.case2.월매출 - results.case2.월총지출,
          results.case3.월매출 - results.case3.월총지출,
        ],
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  const combinedChartData = {
    labels: ['기본', `${scenarios.case2}% 증가`, `${scenarios.case3}% 증가`],
    datasets: [
      {
        type: 'bar',
        label: '월 매출',
        data: [results.case1.월매출, results.case2.월매출, results.case3.월매출],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        yAxisID: 'y',
      },
      {
        type: 'bar',
        label: '월 총 지출',
        data: [results.case1.월총지출, results.case2.월총지출, results.case3.월총지출],
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
        yAxisID: 'y',
      },
      {
        type: 'line',
        label: '월 순이익',
        data: [
          results.case1.월매출 - results.case1.월총지출,
          results.case2.월매출 - results.case2.월총지출,
          results.case3.월매출 - results.case3.월총지출,
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
              label={field}
              type="number"
              value={inputs[field]}
              onChange={handleInputChange(field)}
              variant="outlined"
              size="small"
              inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
              InputProps={{
                endAdornment: field === '대출이자' ? '%' : null,
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
              helperText={field !== '대출이자' ? formatNumber(inputs[field]) : null}
            />
          </Grid>
        ))}
      </Grid>
    </Paper>
  );

  return (
    <Container maxWidth="xl" sx={{ mt: 2, mb: 2, height: '100vh' }}>
      <Typography 
        variant="h4" 
        component="h1" 
        gutterBottom 
        align="center"
        sx={{ 
          color: '#1d1d1f',
          fontWeight: 600,
          mb: { xs: 1, md: 2 },
          fontSize: { xs: '1.5rem', md: '2rem' }
        }}
      >
        비즈니스 수익성 분석
      </Typography>

      <Box sx={{ mb: 2, textAlign: 'right' }}>
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
          PDF로 저장
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
          }}
        >
          JPG로 저장
        </Button>
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
                매출 증대 시나리오
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Case 2 증가율 (%)"
                    type="number"
                    value={scenarios.case2}
                    onChange={e => setScenarios({ ...scenarios, case2: Number(e.target.value) })}
                    variant="outlined"
                    size="small"
                    inputProps={{ min: 0, max: 50, inputMode: 'numeric', pattern: '[0-9]*' }}
                    InputLabelProps={{ shrink: true }}
                    helperText="일매출수/평단가에 적용될 증가율 (예: 10 입력 시 10% 증가)"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Case 3 증가율 (%)"
                    type="number"
                    value={scenarios.case3}
                    onChange={e => setScenarios({ ...scenarios, case3: Number(e.target.value) })}
                    variant="outlined"
                    size="small"
                    inputProps={{ min: 0, max: 50, inputMode: 'numeric', pattern: '[0-9]*' }}
                    InputLabelProps={{ shrink: true }}
                    helperText="일매출수/평단가에 적용될 증가율 (예: 20 입력 시 20% 증가)"
                  />
                </Grid>
              </Grid>

              {renderInputSection('주요 운영 비용', [
                '평단가',
                '일매출수',
                '원재료비',
                '월관리비',
              ])}
              {renderInputSection('초기 투자 및 자금 조달', [
                '대출원금',
                '대출이자',
                '초기투자금',
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
                     분석 결과
                   </Typography>
                    {['case1', 'case2', 'case3'].map((case_, index) => {
                       const monthlyProfit = results[case_].월매출 - results[case_].월총지출;
                       return (
                         <Box key={case_} sx={{ mb: 1 }}>
                            <Typography variant="subtitle2" sx={{ color: '#1d1d1f', fontWeight: 500, fontSize: 14 }}>
                               {index === 0 ? '기본 시나리오' : `Case ${index + 1} (${scenarios[case_]}% 증가)`}
                             </Typography>
                             <Typography variant="body2" sx={{ color: '#1d1d1f' }}>
                               월 매출: {formatNumber(results[case_].월매출 || 0)}원
                             </Typography>
                              <Typography variant="body2" sx={{ color: '#1d1d1f' }}>
                               월 총 지출: {formatNumber(results[case_].월총지출 || 0)}원
                              </Typography>
                             <Typography variant="body2" sx={{ color: '#1d1d1f', fontWeight: 600 }}>
                               월 순이익: {formatNumber(monthlyProfit || 0)}원
                             </Typography>
                         </Box>
                       );
                    })}
                 </Paper>
               </Grid>

              {/* Charts (PC 상단 60%, 모바일 자동 높이) */}
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
                      월 매출 및 지출 비교
                    </Typography>
                    <Bar data={barChartData} options={{ ...chartOptions, plugins: { ...chartOptions.plugins, legend: { display: false } }, maintainAspectRatio: false, aspectRatio: 1.2, }} />
                  </Box>
                  <Box sx={{ width: { xs: '100%', md: '50%' }, height: { xs: 200, md: 240 } }}>
                    <Typography variant="subtitle1" sx={{ color: '#1d1d1f', mb: 1, fontSize: { xs: 14, md: 15 } }}>
                      월 순이익 추이
                    </Typography>
                    <Line data={lineChartData} options={{ ...chartOptions, plugins: { ...chartOptions.plugins, legend: { display: false } }, maintainAspectRatio: false, aspectRatio: 1.2, }} />
                  </Box>
                </Paper>
              </Grid>

              {/* Investment Recovery Period + 통합분석 (PC 하단 40%, 모바일 자동 높이) */}
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
                   {/* Text Results Section (PC에서만 표시) */}
                  <Box sx={{ width: { xs: '100%', md: '55%' }, height: { xs: 200, md: 180 }, display: { xs: 'none', md: 'block' } }}>
                    <Typography variant="subtitle1" sx={{ color: '#1d1d1f', mb: 1, fontSize: 15 }}>
                      통합 분석
                    </Typography>
                    <Bar data={combinedChartData} options={{ ...chartOptions, plugins: { ...chartOptions.plugins, legend: { display: false } }, maintainAspectRatio: false, aspectRatio: 1.2, }} />
                  </Box>
                  <Box sx={{ width: { xs: '100%', md: '45%' }, height: { xs: 'auto', md: 180 }, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <Typography variant="subtitle1" sx={{ color: '#1d1d1f', mb: 1, fontSize: 15 }}>
                      투자 회수 기간
                    </Typography>
                    <Grid container spacing={1}>
                      {['case1', 'case2', 'case3'].map((case_, index) => {
                        const monthlyProfit = results[case_].월매출 - results[case_].월총지출;
                        const monthsToRecover = monthlyProfit > 0 ? inputs.초기투자금 / monthlyProfit : Infinity;
                        const years = isFinite(monthsToRecover) ? Math.floor(monthsToRecover / 12) : 'N/A';
                        const months = isFinite(monthsToRecover) ? Math.round(monthsToRecover % 12) : 'A';
                        const emoji = isFinite(monthsToRecover) ? getEmoji(years, months) : '🤔';

                        return (
                          <Grid item xs={12} sm={4} key={case_}>
                            <Paper sx={{ p: 1, bgcolor: 'rgba(255,255,255,0.95)', borderRadius: 2, boxShadow: '0 2px 8px rgba(0,0,0,0.05)', textAlign: 'center' }}>
                              <Typography variant="subtitle2" sx={{ color: '#1d1d1f', fontWeight: 500, fontSize: 14 }}>
                                {index === 0 ? '기본' : `${scenarios[case_]}% 증가`}
                              </Typography>
                              <Typography sx={{ color: '#1d1d1f', fontSize: '1.1rem', mt: 0.5 }}>
                                {isFinite(monthsToRecover) ? `${years}년 ${months}개월` : '계산 불가'} {emoji}
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

export default App; 