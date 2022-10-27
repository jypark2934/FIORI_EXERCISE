sap.ui.define([
    "sap/ui/core/mvc/Controller", "sap/ui/model/json/JSONModel", "sap/ui/model/Filter"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel, Filter) {
        "use strict";

        return Controller.extend("odatatest07.controller.Main", {
            onInit: function () {

            },

            onRead: function() {
                var oDataModel = this.getView().getModel("list");

                oDataModel.read("/SalesOrderSet", {
                    success : function(oReturn) {
                        console.log(oReturn);

                    
                    },
                    error : function(oError) {}

                    });
                },

            onReadEntity: function() {
                    /*
                    
                    */ 
                   var oView = this.getView();
                    var oDataModel = this.getView().getModel("list");
                    var path = oDataModel.createKey("/SalesOrderSet", {
                        Sonum : "C0012",
                    }); // "/SalesOrderSet('C0012')"와 같다.
                    //debugger;
                    oDataModel.read(path, {
                        success : function(oReturn) {
                            console.log(oReturn);
                            // JSON 데이터의 특정 Value에 접근하고 싶은 경우
                            // 예시 json데이터가  {name : { age : 10 }} 으로 되어있으면
                            // name.age 이렇게 . 으로 접근하여 10이라는 값을 가져올 수 있다
                            //debugger;   // 로직 실행 중 디버거 키워드를 만나면 프로세스를 멈춤
                            /*이 부분에서 View의 SimpleForm Text에 세팅
                             1. oView.byId("아이디값"); 객체를 가져옴
                             2. 객체에 text 프로퍼티값에 서버에서 받아온 Sonum,Memo값을 세팅한다.
                             3. 세팅할때 객체.setText(세팅값)의 형태로 세팅할 수 있다.
                            */ 
                            oView.byId("idSonum").setText(oReturn.Sonum);       //  .byId 로 먼저 주소를 가져오고  .setText 로 return 값을 가져온다
                            oView.byId("idMemo").setText(oReturn.Memo);



                        },
                        error : function(oError) {},

                    });
                },
                // 테이블 데이터 클릭 시 이벤트 함수 실행
                onSelectionChange: function(oEvent) {
                   
                    var sPath = oEvent.getParameters().listItem.getBindingContextPath(); 
                    var oView = this.getView();
                    // 내가 선택한 ROW의 Model Binding Path 값을 가져옴 ==> "/SalesOrderSet('내가 선택한 ROW의 KEY')""

                    var oModel = this.getView().getModel("list");

                    oModel.read( sPath, {
                        success: function(oReturn) {
                            console.log(oReturn);
                            // sap.m.Input의 value 프로퍼티에 세팅
                            // debugger;
                            oView.byId("idSonum2").setValue(oReturn.Sonum);
                            oView.byId("idMemo2").setValue(oReturn.Memo);

                            oView.byId("inpDeleteSonum").setValue(oReturn.Sonum);
                            oView.byId("inpDeleteMemo").setValue(oReturn.Memo);

                        },
                        error: function(oError) {
                            console.log(oReturn);
                        }

                    });
                },

                onUpdate: function() {
                     // put요청: /sap/opu/odata/sap/ZGWSALESBOO_SRV/SalesOrderSet + KEY + BODY
                    var oModel = this.getView().getModel("list"); // odata Model
                    var oView = this.getView();
                    var odata = { // UPDATE 요청 시 JSON DATA로 Body 구성
                        "Sonum" : oView.byId("idSonum2").getValue(),
                        "Memo"  : oView.byId("idMemo2").getValue()
                    };
                    var path = oModel.createKey("/SalesOrderSet", { // "/SalesOrderSet('선택ROW의Sonum값')" 와 같음
                        Sonum : oView.byId("idSonum2").getValue(),
                    }); // 내부적으로는 "/SalesOrderSet"('선택ROW의Sonum값')의 형태가 됨.

                    // Server에 PUT 요청을 보냄.
                    oModel.update(path, odata, {
                        success: function(oReturn) { //성공 시 함수 실행
                            sap.m.MessageToast.show("업데이트 성공!");
                        },
                        error: function(oError) {
                            sap.m.MessageToast.show("에러발생!");
                        }, // 에러 발생 시 함수 실행

                    })

                },

                onCreate: function() {
                    // post 요청: /sap/opu/odata/sap/ZGWSALESBOO_SRV/SalesOrderSet + BODY
                    var oModel = this.getView().getModel("list"); // odata Model
                    var oView = this.getView();
                    var odata = { // UPDATE 요청 시 JSON DATA로 Body 구성
                        "Sonum" : oView.byId("inpCreateSonum").getValue(),
                        "Memo"  : oView.byId("inpCreateMemo").getValue()
                    };
                    // create는 가져올 값이 없기때문에 key값 가져올 path를 할 필요가 없다
                    // Server에 Post 요청을 보냄.
                    oModel.create("/SalesOrderSet", odata, {
                        success: function(oReturn) { //성공 시 함수 실행
                            sap.m.MessageToast.show("생성 성공!");
                        },
                        error: function(oError) {
                            sap.m.MessageToast.show("에러발생!");
                        }, // 에러 발생 시 함수 실행

                    })

                },

                onDelete: function() {
                    // delete 요청:
                    var oModel = this.getView().getModel("list"); // odata Model
                    var oView = this.getView();
                    var odata = { // UPDATE 요청 시 JSON DATA로 Body 구성
                        "Sonum" : oView.byId("inpDeleteSonum").getValue(),
                        "Memo"  : oView.byId("inpDeleteMemo").getValue()
                    };
                    var path = oModel.createKey("/SalesOrderSet", { // "/SalesOrderSet('선택ROW의Sonum값')" 와 같음
                        Sonum : oView.byId("inpDeleteSonum").getValue(),
                    }); // 내부적으로는 "/SalesOrderSet"('선택ROW의Sonum값')의 형태가 됨.

                    // Server에 PUT 요청을 보냄.
                    oModel.remove(path, odata, {
                        success: function(oReturn) { //성공 시 함수 실행
                            sap.m.MessageToast.show("삭제 성공!");
                        },
                        error: function(oError) {
                            sap.m.MessageToast.show("에러발생!");
                        }, // 에러 발생 시 함수 실행

                    })

                },

                onFilterSearch: function() {
                    var sInputValue1 = this.byId("inpFilterSonum").getValue();
                    var sInputValue2 = this.byId("inpFilterMemo").getValue();

                    var oFilter1 = new Filter("Sonum", "EQ", sInputValue1);
                    var oFilter2 = new Filter("Memo", "EQ", sInputValue2);
                    //필터여러개면 배열
                    var aFilter = [
                        oFilter1,
                        oFilter2

                    ];
                    

                    // aFilter.push(oFilter1);
                    // aFilter.push(oFilter2);
                    
                    /* 
                    aFilter
                    [
                        new Filter,
                        new Filter,
                        new Filter,
                    ]
                    */
                   debugger;
                    // 바인딩된 아이템을 갖고 와서 필터해준다
                    this.byId("idProductsTable").getBinding("items").filter(new Filter({
                        filters: aFilter,
                        and: true
                      }));
                },

            });
            });
