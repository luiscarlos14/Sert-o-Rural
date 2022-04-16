import { useEffect, useState } from 'react';
import Chart from 'chart.js';
import Card from '@material-tailwind/react/Card';
import CardHeader from '@material-tailwind/react/CardHeader';
import CardBody from '@material-tailwind/react/CardBody';

import api, { TOKEN_KEY, ID } from "../api";

const token = sessionStorage.getItem(TOKEN_KEY);
const id = localStorage.getItem(ID);

export default function ChartLine() {
    
    //Vendas
    const [jan, setJan] = useState("")
    const [fev, setFev] = useState("")
    const [mar, setMar] = useState("")
    const [abr, setAbr] = useState("")
    const [mai, setMai] = useState("")
    const [jun, setJun] = useState("")
    const [jul, setJul] = useState("")
    const [ago, setAgo] = useState("")
    const [set, setSet] = useState("")
    const [out, setOut] = useState("")
    const [nov, setNov] = useState("")
    const [dez, setDez] = useState("")
    //Despesas
    const [janDespesas, setJanDespesas] = useState("")
    const [fevDespesas, setFevDespesas] = useState("")
    const [marDespesas, setMarDespesas] = useState("")
    const [abrDespesas, setAbrDespesas] = useState("")
    const [maiDespesas, setMaiDespesas] = useState("")
    const [junDespesas, setJunDespesas] = useState("")
    const [julDespesas, setJulDespesas] = useState("")
    const [agoDespesas, setAgoDespesas] = useState("")
    const [setDespesas, setSetDespesas] = useState("")
    const [outDespesas, setOutDespesas] = useState("")
    const [novDespesas, setNovDespesas] = useState("")
    const [dezDespesas, setDezDespesas] = useState("")


    async function getSomaVendas(){
    
        const res = (await api.get(`/sales/summonths/${id}`, { 
          headers: { Authorization: `token ${token}`}},
          )).data.sum_sales_month;
        return res;
    }

    async function getSomaDespesas(){
    
        const res = (await api.get(`/expenditures/summonths/${id}`, { 
          headers: { Authorization: `token ${token}`}},
          )).data.sum_expenditure_month;
        return res;
    }

    useEffect(() => {
        getSomaVendas()
          .then((result) => {
            setJan(result["Jan"]);
            setFev(result["Feb"]);
            setMar(result["Mar"]);
            setAbr(result["Apr"]);
            setMai(result["May"]);
            setJun(result["Jun"]);
            setJul(result["Jul"]);
            setAgo(result["Aug"]);
            setSet(result["Sep"]);
            setOut(result["Oct"]);
            setNov(result["Nov"]);
            setDez(result["Dec"]);
          })
          .catch();
      }, []);

      useEffect(() => {
        getSomaDespesas()
          .then((result) => {
            setJanDespesas(result["Jan"]);
            setFevDespesas(result["Feb"]);
            setMarDespesas(result["Mar"]);
            setAbrDespesas(result["Apr"]);
            setMaiDespesas(result["May"]);
            setJunDespesas(result["Jun"]);
            setJulDespesas(result["Jul"]);
            setAgoDespesas(result["Aug"]);
            setSetDespesas(result["Sep"]);
            setOutDespesas(result["Oct"]);
            setNovDespesas(result["Nov"]);
            setDezDespesas(result["Dec"]);
          })
          .catch();
      }, []);

    //const vendas = [parseInt(jan), parseInt(fev), parseInt(mar), parseInt(abr), parseInt(mai), parseInt(jun), parseInt(jul) ,parseInt(ago), parseInt(set), parseInt(out), parseInt(nov), parseInt(dez)];


//console.log(vendas)

    

    useEffect(() => {
        var config = {
            type: 'line',
            data: {
                labels: [
                    'Janeiro',
                    'Fevereiro',
                    'Março',
                    'Abril',
                    'Maio',
                    'Junho',
                    'Julho',
                    'Agosto',
                    'Setembro',
                    'Outubro',
                    'Novembro',
                    'Dezembro',
                ],
                datasets: [
                    {
                        label: 'Vendas',
                        backgroundColor: '#03a9f4',
                        borderColor: '#03a9f4',
                        data: [parseInt(jan), parseInt(fev), parseInt(mar), parseInt(abr), parseInt(mai), parseInt(jun), parseInt(jul) ,parseInt(ago), parseInt(set), parseInt(out), parseInt(nov), parseInt(dez)],
                        fill: false,
                    },
                    {
                        label: 'Despesas',
                        fill: false,
                        backgroundColor: '#ff9800',
                        borderColor: '#ff9800',
                        data: [parseInt(janDespesas), parseInt(fevDespesas), parseInt(marDespesas), parseInt(abrDespesas), parseInt(maiDespesas), parseInt(junDespesas), parseInt(julDespesas) ,parseInt(agoDespesas), parseInt(setDespesas), parseInt(outDespesas), parseInt(novDespesas), parseInt(dezDespesas)],
                    },
                ],
            },
            options: {
                maintainAspectRatio: false,
                responsive: true,
                title: {
                    display: false,
                    text: 'Sales Charts',
                    fontColor: 'white',
                },
                legend: {
                    labels: {
                        fontColor: 'black',
                    },
                    align: 'end',
                    position: 'bottom',
                },
                tooltips: {
                    mode: 'index',
                    intersect: false,
                },
                hover: {
                    mode: 'nearest',
                    intersect: false,
                },
                scales: {
                    xAxes: [
                        {
                            ticks: {
                                fontColor: 'rgba(17,17,17,.7)',
                            },
                            display: true,
                            scaleLabel: {
                                display: false,
                                labelString: 'Month',
                                fontColor: 'white',
                            },
                            gridLines: {
                                display: false,
                                borderDash: [2],
                                borderDashOffset: [2],
                                color: 'rgba(33, 37, 41, 0.3)',
                                zeroLineColor: 'rgba(0, 0, 0, 0)',
                                zeroLineBorderDash: [2],
                                zeroLineBorderDashOffset: [2],
                            },
                        },
                    ],
                    yAxes: [
                        {
                            ticks: {
                                fontColor: 'rgba(17,17,17,.7)',
                            },
                            display: true,
                            scaleLabel: {
                                display: false,
                                labelString: 'Value',
                                fontColor: 'white',
                            },
                            gridLines: {
                                borderDash: [3],
                                borderDashOffset: [3],
                                drawBorder: false,
                                color: 'rgba(17, 17, 17, 0.15)',
                                zeroLineColor: 'rgba(33, 37, 41, 0)',
                                zeroLineBorderDash: [2],
                                zeroLineBorderDashOffset: [2],
                            },
                        },
                    ],
                },
            },
        };
        var ctx = document.getElementById('line-chart').getContext('2d');
        window.myLine = new Chart(ctx, config);
    }, [janDespesas, fevDespesas, marDespesas, abrDespesas, maiDespesas, junDespesas, julDespesas, agoDespesas, setDespesas, outDespesas, novDespesas, dezDespesas, jan, fev, mar, abr, mai, jun, jul, ago, set, out, nov, dez]);

    return (
        <Card>
            <CardHeader color="orange" contentPosition="left">
                <h6 className="uppercase text-gray-200 text-xs font-medium">
                    Gráfico Anual em R$
                </h6>
                <h2 className="text-white text-2xl">Vendas e Despesas</h2>
            </CardHeader>
            <CardBody>
                <div className="relative h-96">
                    <canvas id="line-chart"></canvas>
                </div>
            </CardBody>
        </Card>
    );
}
