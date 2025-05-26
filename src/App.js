import React, { useState, useEffect, useRef } from 'react';
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
    상가보증금: 30000000,
    대출이자: 5,
    투자비: 50000000,
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

  const calculateResults = () => {
    // Case 1 (기본)
    const case1 = {
      월매출: inputs.평단가 * ((inputs.일매출수 * 22) + (inputs.일매출수 * 1.1 * 8)),
      월총지출: (inputs.원재료비 * ((inputs.일매출수 * 22) + (inputs.일매출수 * 1.1 * 8))) +
        inputs.월관리비 + (inputs.상가보증금 * (inputs.대출이자 / 100) / 12),
    };

    // Case 2 (사용자 지정 % 증가)
    const case2 = {
      월매출: inputs.평단가 * ((inputs.일매출수 * (1 + scenarios.case2/100) * 22) + 
        (inputs.일매출수 * (1 + scenarios.case2/100) * 1.1 * 8)),
      월총지출: (inputs.원재료비 * ((inputs.일매출수 * (1 + scenarios.case2/100) * 22) + 
        (inputs.일매출수 * (1 + scenarios.case2/100) * 1.1 * 8))) +
        inputs.월관리비 + (inputs.상가보증금 * (inputs.대출이자 / 100) / 12),
    };

    // Case 3 (사용자 지정 % 증가)
    const case3 = {
      월매출: inputs.평단가 * ((inputs.일매출수 * (1 + scenarios.case3/100) * 22) + 
        (inputs.일매출수 * (1 + scenarios.case3/100) * 1.1 * 8)),
      월총지출: (inputs.원재료비 * ((inputs.일매출수 * (1 + scenarios.case3/100) * 22) + 
        (inputs.일매출수 * (1 + scenarios.case3/100) * 1.1 * 8))) +
        inputs.월관리비 + (inputs.상가보증금 * (inputs.대출이자 / 100) / 12),
    };

    setResults({ case1, case2, case3 });
  };

  useEffect(() => {
    calculateResults();
  }, [inputs, scenarios, calculateResults]);

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
        p: 3, 
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
          mb: 2,
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
          }}
        >
          PDF로 저장
        </Button>
      </Box>

      <div ref={contentRef}>
        <Grid container spacing={2} sx={{ height: 'calc(100vh - 120px)' }}>
          {/* Left Side - Input Section */}
          <Grid item xs={12} md={5}>
            <Paper 
              sx={{ 
                p: 2, 
                height: '100%',
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
                  />
                </Grid>
              </Grid>

              {renderInputSection('매출 입력값', ['평단가', '일매출수', '원재료비'])}
              {renderInputSection('월관리비', ['월관리비'])}
              {renderInputSection('상가임대료', ['상가보증금', '대출이자'])}
              {renderInputSection('투자비', ['투자비'])}
            </Paper>
          </Grid>

          {/* Right Side - Results Section */}
          <Grid item xs={12} md={7}>
            <Grid container spacing={2} sx={{ height: '100%' }}>
              {/* Charts (상단 60%) */}
              <Grid item xs={12} sx={{ height: '60%' }}>
                <Paper 
                  sx={{ 
                    p: 2,
                    height: '100%',
                    borderRadius: 2,
                    boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 2,
                  }}
                >
                  <Box sx={{ width: '50%', height: 240 }}>
                    <Typography variant="subtitle1" sx={{ color: '#1d1d1f', mb: 1, fontSize: 15 }}>
                      월 매출 및 지출 비교
                    </Typography>
                    <Bar data={barChartData} options={{ ...chartOptions, plugins: { ...chartOptions.plugins, legend: { display: false } }, maintainAspectRatio: false, aspectRatio: 1.2, }} height={180} />
                  </Box>
                  <Box sx={{ width: '50%', height: 240 }}>
                    <Typography variant="subtitle1" sx={{ color: '#1d1d1f', mb: 1, fontSize: 15 }}>
                      월 순이익 추이
                    </Typography>
                    <Line data={lineChartData} options={{ ...chartOptions, plugins: { ...chartOptions.plugins, legend: { display: false } }, maintainAspectRatio: false, aspectRatio: 1.2, }} height={180} />
                  </Box>
                </Paper>
              </Grid>

              {/* Investment Recovery Period + 통합분석 (하단 40%) */}
              <Grid item xs={12} sx={{ height: '40%' }}>
                <Paper 
                  sx={{ 
                    p: 2,
                    height: '100%',
                    borderRadius: 2,
                    boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 2,
                  }}
                >
                  <Box sx={{ width: '55%', height: 180 }}>
                    <Typography variant="subtitle1" sx={{ color: '#1d1d1f', mb: 1, fontSize: 15 }}>
                      통합 분석
                    </Typography>
                    <Bar data={combinedChartData} options={{ ...chartOptions, plugins: { ...chartOptions.plugins, legend: { display: false } }, maintainAspectRatio: false, aspectRatio: 1.2, }} height={140} />
                  </Box>
                  <Box sx={{ width: '45%', height: 180, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <Typography variant="subtitle1" sx={{ color: '#1d1d1f', mb: 1, fontSize: 15 }}>
                      투자 회수 기간
                    </Typography>
                    <Grid container spacing={1}>
                      {['case1', 'case2', 'case3'].map((case_, index) => {
                        const monthlyProfit = results[case_].월매출 - results[case_].월총지출;
                        const monthsToRecover = inputs.투자비 / monthlyProfit;
                        const years = Math.floor(monthsToRecover / 12);
                        const months = Math.round(monthsToRecover % 12);
                        const emoji = getEmoji(years, months);
                        return (
                          <Grid item xs={4} key={case_}>
                            <Paper sx={{ p: 1, bgcolor: 'rgba(255,255,255,0.95)', borderRadius: 2, boxShadow: '0 2px 8px rgba(0,0,0,0.05)', textAlign: 'center' }}>
                              <Typography variant="subtitle2" sx={{ color: '#1d1d1f', fontWeight: 500, fontSize: 14 }}>
                                {index === 0 ? '기본' : `${scenarios[case_]}% 증가`}
                              </Typography>
                              <Typography sx={{ color: '#1d1d1f', fontSize: '1.1rem', mt: 0.5 }}>
                                {years}년 {months}개월 {emoji}
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