$(function () {
    echart_map();
    function echart_map() {
         // 基于准备好的dom，初始化echarts实例
         var myChart = echarts.init(document.getElementById('chart_map'));
         var mapName = 'china'
         var data = []
         var toolTipData = [];
         /*获取地图数据*/
         myChart.showLoading();
         var mapFeatures = echarts.getMap(mapName).geoJson.features;
         myChart.hideLoading();
         var geoCoordMap = {
             '深圳': [114.085947, 22.547],
             '北京': [116.4551, 40.2539],
             '无锡': [120.301663,31.574729],
             '上海': [121.40, 31.73],
         };
         var GZData = [
             [{
                 name: '无锡'
             }, {
                 name: '深圳',
                 value: 40
             }],
             [{
                 name: '无锡'
             }, {
                 name: '北京',
                 value: 40
             }],
             [{
                 name: '无锡'
             }, {
                 name: '上海',
                 value: 40
             }],
         ];
 
         var convertData = function (data) {
             var res = [];
             for (var i = 0; i < data.length; i++) {
                 var dataItem = data[i];
                 var fromCoord = geoCoordMap[dataItem[0].name];
                 var toCoord = geoCoordMap[dataItem[1].name];
                 if (fromCoord && toCoord) {
                     res.push({
                         fromName: dataItem[0].name,
                         toName: dataItem[1].name,
                         coords: [fromCoord, toCoord]
                     });
                 }
             }
             return res;
         };
         //小圆点和发散的线
         var color = ['#1a6dee'];//自定义要用到的颜色
         var series = [];//用来存储地图数据
         [
             ['无锡', GZData]
         ].forEach(function (item, i) {
             series.push({
                 type: 'lines',
                 zlevel: 2,
                //  symbol: ['none', 'arrow'],
                 //箭头的大小
                //  symbolSize: 10,
                 effect: {
                     show: true,// 动效是否显示
                     period: 6,// 特效动画时间
                     trailLength: 0,// 特效尾迹的长度
                     symbol: 'arrow',
                      //发散箭头的大小
                     symbolSize: 5// 特效大小
                 },
                 lineStyle: {
                     normal: {
                         color: color[i],
                         width: 1,// 因为是叠加效果，要是有宽度，线条会变粗，白色航线特效不明显
                         opacity: 0.6,
                         curveness: 0.2// 线条曲度
                     }
                 },
                 data: convertData(item[1])
             }, {
                 type: 'effectScatter',// 散点效果
                 coordinateSystem: 'geo',// 表示使用的坐标系为地理坐标系
                 zlevel: 2,
                 rippleEffect: {
                     brushType: 'stroke' // 波纹绘制效果
                 },
                 label: {
                     normal: {
                         show: true,
                         position: 'right',// 标签显示的位置
                         formatter: '{b}',// 标签内容格式器
                         textStyle: {
                            fontSize: "16"
                        }
            
                     }
                 },
                 //点点的大小
                 symbolSize: function (val) {
                     return val[2] / 12;
                 },
                 itemStyle: {
                     normal: {
                         color: color[i]
                     }
                 },
                 data: item[1].map(function (dataItem) {
                     return {
                         name: dataItem[1].name,
                         value: geoCoordMap[dataItem[1].name].concat([dataItem[1].value])
                     };
                 })
             });
         });
         //终点的位置无锡的设置
         series.push({
            type: 'effectScatter',
            coordinateSystem: 'geo',
            symbolSize: function(val) {
                return val[1] / 12;
            },
              itemStyle: {
                     normal: {
                         color:'#1a6dee'
                     }
                 },
            data: [{
                name: '无锡',
                value: [120.301663,31.574729],
                label: {
                    normal: {
                        show: true,
                        position: 'bottom',// 标签显示的位置
                        formatter: '{b}',// 标签内容格式器
                        textStyle: {
                           fontSize: "16",
                           color:"#1a6dee"
                       }
           
                    }
                },
            }]
        });
         option = {
             geo: {
                 map: 'china',
                 label: {
                     emphasis: {
                         show: false
                     }
                 },
                 //禁止用户鼠标放大
                 roam: false,
                 itemStyle: {
                     normal: {
                         //          	color: '#ddd',
                        //  borderColor: 'rgba(147, 235, 248, 1)',
                         borderColor: '#bbc3d0',
                         borderWidth: 1,
                         areaColor: {
                             colorStops: [{
                                 offset: 0,
                                 color: 'rgba(175,238,238, 0)'
                                //  color:'white' // 0% 处的颜色
                             }, {
                                 offset: 1,
                                 color: 'rgba(	47,79,79, .1)' // 100% 处的颜色
                             }],
                             globalCoord: false // 缺省为 false
                         },
                     },
                     //鼠标经过区域部分
                     emphasis: {
                         areaColor: 'white',
                     }
                 }
             },
             series: series
         };
 
         // 使用刚指定的配置项和数据显示图表。
         myChart.setOption(option);
         window.addEventListener("resize", function () {
             myChart.resize();
         });
 
    }
});
