const base = {
    get() {
        return {
            url : "http://localhost:8080/springbootod8kr/",
            name: "springbootod8kr",
            // 退出到首页链接
            indexUrl: 'http://localhost:8080/springbootod8kr/front/dist/index.html'
        };
    },
    getProjectName(){
        return {
            projectName: "汽车服务管理系统"
        } 
    }
}
export default base
