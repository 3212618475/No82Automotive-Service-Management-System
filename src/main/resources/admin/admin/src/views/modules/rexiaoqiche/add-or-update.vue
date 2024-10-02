<template>
	<div class="addEdit-block" :style='{"padding":"30px 0 0"}' style="width: 100%;">
		<el-form
			:style='{"width":"86%","padding":"30px","boxShadow":"0px 4px 10px 0px rgba(0,0,0,0.3020)","margin":"0 auto","borderRadius":"6px","background":"rgba(255,255,255,.8)"}'
			class="add-update-preview"
			ref="ruleForm"
			:model="ruleForm"
			:rules="rules"
			label-width="140px"
		>
			<template >
				<el-form-item :style='{"width":"100%","margin":"0 0 20px","display":"inline-block"}' class="input" v-if="type!='info'"  label="汽车名称" prop="qichemingcheng">
					<el-input v-model="ruleForm.qichemingcheng" placeholder="汽车名称" clearable  :readonly="ro.qichemingcheng"></el-input>
				</el-form-item>
				<el-form-item :style='{"width":"100%","margin":"0 0 20px","display":"inline-block"}' v-else class="input" label="汽车名称" prop="qichemingcheng">
					<el-input v-model="ruleForm.qichemingcheng" placeholder="汽车名称" readonly></el-input>
				</el-form-item>
				<el-form-item :style='{"width":"100%","margin":"0 0 20px","display":"inline-block"}' class="upload" v-if="type!='info' && !ro.qichetupian" label="汽车图片" prop="qichetupian">
					<file-upload
						tip="点击上传汽车图片"
						action="file/upload"
						:limit="3"
						:multiple="true"
						:fileUrls="ruleForm.qichetupian?ruleForm.qichetupian:''"
						@change="qichetupianUploadChange"
					></file-upload>
				</el-form-item>
				<el-form-item :style='{"width":"100%","margin":"0 0 20px","display":"inline-block"}' class="upload" v-else-if="ruleForm.qichetupian" label="汽车图片" prop="qichetupian">
					<img v-if="ruleForm.qichetupian.substring(0,4)=='http'" class="upload-img" style="margin-right:20px;" v-bind:key="index" :src="ruleForm.qichetupian.split(',')[0]" width="100" height="100">
					<img v-else class="upload-img" style="margin-right:20px;" v-bind:key="index" v-for="(item,index) in ruleForm.qichetupian.split(',')" :src="$base.url+item" width="100" height="100">
				</el-form-item>
				<el-form-item :style='{"width":"100%","margin":"0 0 20px","display":"inline-block"}' class="select" v-if="type!='info'"  label="汽车品牌" prop="qichepinpai">
					<el-select :disabled="ro.qichepinpai" v-model="ruleForm.qichepinpai" placeholder="请选择汽车品牌" >
						<el-option
							v-for="(item,index) in qichepinpaiOptions"
							v-bind:key="index"
							:label="item"
							:value="item">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item :style='{"width":"100%","margin":"0 0 20px","display":"inline-block"}' v-else class="input" label="汽车品牌" prop="qichepinpai">
					<el-input v-model="ruleForm.qichepinpai"
						placeholder="汽车品牌" readonly></el-input>
				</el-form-item>
				<el-form-item :style='{"width":"100%","margin":"0 0 20px","display":"inline-block"}' class="select" v-if="type!='info'"  label="汽车分类" prop="qichefenlei">
					<el-select :disabled="ro.qichefenlei" v-model="ruleForm.qichefenlei" placeholder="请选择汽车分类" >
						<el-option
							v-for="(item,index) in qichefenleiOptions"
							v-bind:key="index"
							:label="item"
							:value="item">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item :style='{"width":"100%","margin":"0 0 20px","display":"inline-block"}' v-else class="input" label="汽车分类" prop="qichefenlei">
					<el-input v-model="ruleForm.qichefenlei"
						placeholder="汽车分类" readonly></el-input>
				</el-form-item>
				<el-form-item :style='{"width":"100%","margin":"0 0 20px","display":"inline-block"}' class="select" v-if="type!='info'"  label="配置" prop="peizhi">
					<el-select :disabled="ro.peizhi" v-model="ruleForm.peizhi" placeholder="请选择配置" >
						<el-option
							v-for="(item,index) in peizhiOptions"
							v-bind:key="index"
							:label="item"
							:value="item">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item :style='{"width":"100%","margin":"0 0 20px","display":"inline-block"}' v-else class="input" label="配置" prop="peizhi">
					<el-input v-model="ruleForm.peizhi"
						placeholder="配置" readonly></el-input>
				</el-form-item>
				<el-form-item :style='{"width":"100%","margin":"0 0 20px","display":"inline-block"}' class="select" v-if="type!='info'"  label="座位" prop="zuowei">
					<el-select :disabled="ro.zuowei" v-model="ruleForm.zuowei" placeholder="请选择座位" >
						<el-option
							v-for="(item,index) in zuoweiOptions"
							v-bind:key="index"
							:label="item"
							:value="item">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item :style='{"width":"100%","margin":"0 0 20px","display":"inline-block"}' v-else class="input" label="座位" prop="zuowei">
					<el-input v-model="ruleForm.zuowei"
						placeholder="座位" readonly></el-input>
				</el-form-item>
				<el-form-item :style='{"width":"100%","margin":"0 0 20px","display":"inline-block"}' class="input" v-if="type!='info'"  label="汽车颜色" prop="qicheyanse">
					<el-input v-model="ruleForm.qicheyanse" placeholder="汽车颜色" clearable  :readonly="ro.qicheyanse"></el-input>
				</el-form-item>
				<el-form-item :style='{"width":"100%","margin":"0 0 20px","display":"inline-block"}' v-else class="input" label="汽车颜色" prop="qicheyanse">
					<el-input v-model="ruleForm.qicheyanse" placeholder="汽车颜色" readonly></el-input>
				</el-form-item>
				<el-form-item :style='{"width":"100%","margin":"0 0 20px","display":"inline-block"}' class="input" v-if="type!='info'"  label="上市年份" prop="shangshinianfen">
					<el-input v-model="ruleForm.shangshinianfen" placeholder="上市年份" clearable  :readonly="ro.shangshinianfen"></el-input>
				</el-form-item>
				<el-form-item :style='{"width":"100%","margin":"0 0 20px","display":"inline-block"}' v-else class="input" label="上市年份" prop="shangshinianfen">
					<el-input v-model="ruleForm.shangshinianfen" placeholder="上市年份" readonly></el-input>
				</el-form-item>
				<el-form-item :style='{"width":"100%","margin":"0 0 20px","display":"inline-block"}' class="input" v-if="type!='info'"  label="汽车价格" prop="qichejiage">
					<el-input v-model="ruleForm.qichejiage" placeholder="汽车价格" clearable  :readonly="ro.qichejiage"></el-input>
				</el-form-item>
				<el-form-item :style='{"width":"100%","margin":"0 0 20px","display":"inline-block"}' v-else class="input" label="汽车价格" prop="qichejiage">
					<el-input v-model="ruleForm.qichejiage" placeholder="汽车价格" readonly></el-input>
				</el-form-item>
				<el-form-item :style='{"width":"100%","margin":"0 0 20px","display":"inline-block"}' class="input" v-if="type!='info'"  label="数量" prop="shuliang">
					<el-input v-model="ruleForm.shuliang" placeholder="数量" clearable  :readonly="ro.shuliang"></el-input>
				</el-form-item>
				<el-form-item :style='{"width":"100%","margin":"0 0 20px","display":"inline-block"}' v-else class="input" label="数量" prop="shuliang">
					<el-input v-model="ruleForm.shuliang" placeholder="数量" readonly></el-input>
				</el-form-item>
			</template>
				<el-form-item :style='{"width":"100%","margin":"0 0 20px","display":"inline-block"}' v-if="type!='info'"  label="参数配置" prop="canshupeizhi">
					<editor 
						style="min-width: 200px; max-width: 600px;"
						v-model="ruleForm.canshupeizhi" 
						class="editor" 
						action="file/upload">
					</editor>
				</el-form-item>
				<el-form-item :style='{"width":"100%","margin":"0 0 20px","display":"inline-block"}' v-else-if="ruleForm.canshupeizhi" label="参数配置" prop="canshupeizhi">
                    <span :style='{"fontSize":"14px","lineHeight":"40px","color":"#333","fontWeight":"500","display":"inline-block"}' v-html="ruleForm.canshupeizhi"></span>
                </el-form-item>
			<el-form-item :style='{"padding":"0","margin":"0"}' class="btn">
				<el-button :style='{"border":"0","cursor":"pointer","padding":"0","margin":"0 20px 0 0","outline":"none","color":"rgba(255, 255, 255, 1)","borderRadius":"4px","background":"rgba(135, 154, 108, 1)","width":"128px","lineHeight":"40px","fontSize":"14px","height":"40px"}'  v-if="type!='info'" type="primary" class="btn-success" @click="onSubmit">提交</el-button>
				<el-button :style='{"border":"1px solid rgba(135, 154, 108, 1)","cursor":"pointer","padding":"0","margin":"0","outline":"none","color":"rgba(135, 154, 108, 1)","borderRadius":"4px","background":"rgba(255, 255, 255, 1)","width":"128px","lineHeight":"40px","fontSize":"14px","height":"40px"}' v-if="type!='info'" class="btn-close" @click="back()">取消</el-button>
				<el-button :style='{"border":"1px solid rgba(135, 154, 108, 1)","cursor":"pointer","padding":"0","margin":"0","outline":"none","color":"rgba(135, 154, 108, 1)","borderRadius":"4px","background":"rgba(255, 255, 255, 1)","width":"128px","lineHeight":"40px","fontSize":"14px","height":"40px"}' v-if="type=='info'" class="btn-close" @click="back()">返回</el-button>
			</el-form-item>
		</el-form>
    

  </div>
</template>
<script>
// 数字，邮件，手机，url，身份证校验
import { isNumber,isIntNumer,isEmail,isPhone, isMobile,isURL,checkIdCard } from "@/utils/validate";
export default {
	data() {
		let self = this
		var validateIdCard = (rule, value, callback) => {
			if(!value){
				callback();
			} else if (!checkIdCard(value)) {
				callback(new Error("请输入正确的身份证号码"));
			} else {
				callback();
			}
		};
		var validateUrl = (rule, value, callback) => {
			if(!value){
				callback();
			} else if (!isURL(value)) {
				callback(new Error("请输入正确的URL地址"));
			} else {
				callback();
			}
		};
		var validateMobile = (rule, value, callback) => {
			if(!value){
				callback();
			} else if (!isMobile(value)) {
				callback(new Error("请输入正确的手机号码"));
			} else {
				callback();
			}
		};
		var validatePhone = (rule, value, callback) => {
			if(!value){
				callback();
			} else if (!isPhone(value)) {
				callback(new Error("请输入正确的电话号码"));
			} else {
				callback();
			}
		};
		var validateEmail = (rule, value, callback) => {
			if(!value){
				callback();
			} else if (!isEmail(value)) {
				callback(new Error("请输入正确的邮箱地址"));
			} else {
				callback();
			}
		};
		var validateNumber = (rule, value, callback) => {
			if(!value){
				callback();
			} else if (!isNumber(value)) {
				callback(new Error("请输入数字"));
			} else {
				callback();
			}
		};
		var validateIntNumber = (rule, value, callback) => {
			if(!value){
				callback();
			} else if (!isIntNumer(value)) {
				callback(new Error("请输入整数"));
			} else {
				callback();
			}
		};
		return {
			id: '',
			type: '',
			
			
			ro:{
				qichemingcheng : false,
				qichetupian : false,
				qichepinpai : false,
				qichefenlei : false,
				peizhi : false,
				zuowei : false,
				qicheyanse : false,
				shangshinianfen : false,
				qichejiage : false,
				shuliang : false,
				canshupeizhi : false,
				clicktime : false,
				clicknum : false,
			},
			
			
			ruleForm: {
				qichemingcheng: '',
				qichetupian: '',
				qichepinpai: '',
				qichefenlei: '',
				peizhi: '',
				zuowei: '',
				qicheyanse: '',
				shangshinianfen: '',
				qichejiage: '',
				shuliang: '',
				canshupeizhi: '',
				clicktime: '',
			},
		
			qichepinpaiOptions: [],
			qichefenleiOptions: [],
			peizhiOptions: [],
			zuoweiOptions: [],
			
			rules: {
				qichemingcheng: [
				],
				qichetupian: [
				],
				qichepinpai: [
				],
				qichefenlei: [
				],
				peizhi: [
				],
				zuowei: [
				],
				qicheyanse: [
					{ required: true, message: '汽车颜色不能为空', trigger: 'blur' },
				],
				shangshinianfen: [
				],
				qichejiage: [
					{ validator: validateIntNumber, trigger: 'blur' },
				],
				shuliang: [
					{ validator: validateIntNumber, trigger: 'blur' },
				],
				canshupeizhi: [
				],
				clicktime: [
				],
				clicknum: [
					{ validator: validateIntNumber, trigger: 'blur' },
				],
			}
		};
	},
	props: ["parent"],
	computed: {



	},
	created() {
	},
	methods: {
		
		// 下载
		download(file){
			window.open(`${file}`)
		},
		// 初始化
		init(id,type) {
			if (id) {
				this.id = id;
				this.type = type;
			}
			if(this.type=='info'||this.type=='else'){
				this.info(id);
			}else if(this.type=='logistics'){
				this.logistics=false;
				this.info(id);
			}else if(this.type=='cross'){
				var obj = this.$storage.getObj('crossObj');
				for (var o in obj){
						if(o=='qichemingcheng'){
							this.ruleForm.qichemingcheng = obj[o];
							this.ro.qichemingcheng = true;
							continue;
						}
						if(o=='qichetupian'){
							this.ruleForm.qichetupian = obj[o];
							this.ro.qichetupian = true;
							continue;
						}
						if(o=='qichepinpai'){
							this.ruleForm.qichepinpai = obj[o];
							this.ro.qichepinpai = true;
							continue;
						}
						if(o=='qichefenlei'){
							this.ruleForm.qichefenlei = obj[o];
							this.ro.qichefenlei = true;
							continue;
						}
						if(o=='peizhi'){
							this.ruleForm.peizhi = obj[o];
							this.ro.peizhi = true;
							continue;
						}
						if(o=='zuowei'){
							this.ruleForm.zuowei = obj[o];
							this.ro.zuowei = true;
							continue;
						}
						if(o=='qicheyanse'){
							this.ruleForm.qicheyanse = obj[o];
							this.ro.qicheyanse = true;
							continue;
						}
						if(o=='shangshinianfen'){
							this.ruleForm.shangshinianfen = obj[o];
							this.ro.shangshinianfen = true;
							continue;
						}
						if(o=='qichejiage'){
							this.ruleForm.qichejiage = obj[o];
							this.ro.qichejiage = true;
							continue;
						}
						if(o=='shuliang'){
							this.ruleForm.shuliang = obj[o];
							this.ro.shuliang = true;
							continue;
						}
						if(o=='canshupeizhi'){
							this.ruleForm.canshupeizhi = obj[o];
							this.ro.canshupeizhi = true;
							continue;
						}
						if(o=='clicktime'){
							this.ruleForm.clicktime = obj[o];
							this.ro.clicktime = true;
							continue;
						}
						if(o=='clicknum'){
							this.ruleForm.clicknum = obj[o];
							this.ro.clicknum = true;
							continue;
						}
				}
				













			}
			
			
			// 获取用户信息
			this.$http({
				url: `${this.$storage.get('sessionTable')}/session`,
				method: "get"
			}).then(({ data }) => {
				if (data && data.code === 0) {
					
					var json = data.data;
				} else {
					this.$message.error(data.msg);
				}
			});
			
            this.$http({
				url: `option/qichepinpai/qichepinpai`,
				method: "get"
            }).then(({ data }) => {
				if (data && data.code === 0) {
					this.qichepinpaiOptions = data.data;
				} else {
					this.$message.error(data.msg);
				}
            });
            this.qichefenleiOptions = "紧凑型车,中型车,中高级车,豪华车,商务车,越野车,跑车".split(',')
            this.peizhiOptions = "低配,中配,高配".split(',')
            this.zuoweiOptions = "2座,4座,5座,7座,其他".split(',')
			
		},
    // 多级联动参数

    info(id) {
      this.$http({
        url: `rexiaoqiche/info/${id}`,
        method: "get"
      }).then(({ data }) => {
        if (data && data.code === 0) {
        this.ruleForm = data.data;
        //解决前台上传图片后台不显示的问题
        let reg=new RegExp('../../../upload','g')//g代表全部
        this.ruleForm.canshupeizhi = this.ruleForm.canshupeizhi.replace(reg,'../../../springbootod8kr/upload');
        } else {
          this.$message.error(data.msg);
        }
      });
    },


    // 提交
    onSubmit() {




	if(this.ruleForm.qichetupian!=null) {
		this.ruleForm.qichetupian = this.ruleForm.qichetupian.replace(new RegExp(this.$base.url,"g"),"");
	}























var objcross = this.$storage.getObj('crossObj');

      //更新跨表属性
       var crossuserid;
       var crossrefid;
       var crossoptnum;
       if(this.type=='cross'){
                var statusColumnName = this.$storage.get('statusColumnName');
                var statusColumnValue = this.$storage.get('statusColumnValue');
                if(statusColumnName!='') {
                        var obj = this.$storage.getObj('crossObj');
                       if(statusColumnName && !statusColumnName.startsWith("[")) {
                               for (var o in obj){
                                 if(o==statusColumnName){
                                   obj[o] = statusColumnValue;
                                 }
                               }
                               var table = this.$storage.get('crossTable');
                             this.$http({
                                 url: `${table}/update`,
                                 method: "post",
                                 data: obj
                               }).then(({ data }) => {});
                       } else {
                               crossuserid=this.$storage.get('userid');
                               crossrefid=obj['id'];
                               crossoptnum=this.$storage.get('statusColumnName');
                               crossoptnum=crossoptnum.replace(/\[/,"").replace(/\]/,"");
                        }
                }
        }
       this.$refs["ruleForm"].validate(valid => {
         if (valid) {
		 if(crossrefid && crossuserid) {
			 this.ruleForm.crossuserid = crossuserid;
			 this.ruleForm.crossrefid = crossrefid;
			let params = { 
				page: 1, 
				limit: 10, 
				crossuserid:this.ruleForm.crossuserid,
				crossrefid:this.ruleForm.crossrefid,
			} 
			this.$http({ 
				url: "rexiaoqiche/page", 
				method: "get", 
				params: params 
			}).then(({ 
				data 
			}) => { 
				if (data && data.code === 0) { 
				       if(data.data.total>=crossoptnum) {
					     this.$message.error(this.$storage.get('tips'));
					       return false;
				       } else {
					 this.$http({
					   url: `rexiaoqiche/${!this.ruleForm.id ? "save" : "update"}`,
					   method: "post",
					   data: this.ruleForm
					 }).then(({ data }) => {
					   if (data && data.code === 0) {
					     this.$message({
					       message: "操作成功",
					       type: "success",
					       duration: 1500,
					       onClose: () => {
						 this.parent.showFlag = true;
						 this.parent.addOrUpdateFlag = false;
						 this.parent.rexiaoqicheCrossAddOrUpdateFlag = false;
						 this.parent.search();
						 this.parent.contentStyleChange();
					       }
					     });
					   } else {
					     this.$message.error(data.msg);
					   }
					 });

				       }
				} else { 
				} 
			});
		 } else {
			 this.$http({
			   url: `rexiaoqiche/${!this.ruleForm.id ? "save" : "update"}`,
			   method: "post",
			   data: this.ruleForm
			 }).then(({ data }) => {
			   if (data && data.code === 0) {
			     this.$message({
			       message: "操作成功",
			       type: "success",
			       duration: 1500,
			       onClose: () => {
				 this.parent.showFlag = true;
				 this.parent.addOrUpdateFlag = false;
				 this.parent.rexiaoqicheCrossAddOrUpdateFlag = false;
				 this.parent.search();
				 this.parent.contentStyleChange();
			       }
			     });
			   } else {
			     this.$message.error(data.msg);
			   }
			 });
		 }
         }
       });
    },
    // 获取uuid
    getUUID () {
      return new Date().getTime();
    },
    // 返回
    back() {
      this.parent.showFlag = true;
      this.parent.addOrUpdateFlag = false;
      this.parent.rexiaoqicheCrossAddOrUpdateFlag = false;
      this.parent.contentStyleChange();
    },
    qichetupianUploadChange(fileUrls) {
	    this.ruleForm.qichetupian = fileUrls;
    },
  }
};
</script>
<style lang="scss" scoped>
	.amap-wrapper {
		width: 100%;
		height: 500px;
	}
	
	.search-box {
		position: absolute;
	}
	
	.el-date-editor.el-input {
		width: auto;
	}
	
	.add-update-preview .el-form-item /deep/ .el-form-item__label {
	  	  padding: 0 10px 0 0;
	  	  color: #333;
	  	  font-weight: 500;
	  	  width: 140px;
	  	  font-size: 14px;
	  	  line-height: 40px;
	  	  text-align: right;
	  	}
	
	.add-update-preview .el-form-item /deep/ .el-form-item__content {
	  margin-left: 140px;
	}
	
	.add-update-preview .el-input /deep/ .el-input__inner {
	  	  border: 2px solid #797979;
	  	  border-radius: 4px;
	  	  padding: 0 12px;
	  	  outline: none;
	  	  color: rgba(121, 121, 121, 1);
	  	  width: auto;
	  	  font-size: 14px;
	  	  min-width: 400px;
	  	  height: 40px;
	  	}
	
	.add-update-preview .el-select /deep/ .el-input__inner {
	  	  border: 2px solid #797979;
	  	  border-radius: 4px;
	  	  padding: 0 10px;
	  	  outline: none;
	  	  color: rgba(121, 121, 121, 1);
	  	  width: auto;
	  	  font-size: 14px;
	  	  min-width: 300px;
	  	  height: 40px;
	  	}
	
	.add-update-preview .el-date-editor /deep/ .el-input__inner {
	  	  border: 2px solid #797979;
	  	  border-radius: 4px;
	  	  padding: 0 10px 0 30px;
	  	  outline: none;
	  	  color: rgba(121, 121, 121, 1);
	  	  width: auto;
	  	  font-size: 14px;
	  	  min-width: 300px;
	  	  height: 40px;
	  	}
	
	.add-update-preview /deep/ .el-upload--picture-card {
		background: transparent;
		border: 0;
		border-radius: 0;
		width: auto;
		height: auto;
		line-height: initial;
		vertical-align: middle;
	}
	
	.add-update-preview /deep/ .upload .upload-img {
	  	  border: 2px dashed #797979;
	  	  cursor: pointer;
	  	  border-radius: 6px;
	  	  color: #797979;
	  	  width: 150px;
	  	  font-size: 32px;
	  	  line-height: 100px;
	  	  text-align: center;
	  	  height: 100px;
	  	}
	
	.add-update-preview /deep/ .el-upload-list .el-upload-list__item {
	  	  border: 2px dashed #797979;
	  	  cursor: pointer;
	  	  border-radius: 6px;
	  	  color: #797979;
	  	  width: 150px;
	  	  font-size: 32px;
	  	  line-height: 100px;
	  	  text-align: center;
	  	  height: 100px;
	  	}
	
	.add-update-preview /deep/ .el-upload .el-icon-plus {
	  	  border: 2px dashed #797979;
	  	  cursor: pointer;
	  	  border-radius: 6px;
	  	  color: #797979;
	  	  width: 150px;
	  	  font-size: 32px;
	  	  line-height: 100px;
	  	  text-align: center;
	  	  height: 100px;
	  	}
	
	.add-update-preview .el-textarea /deep/ .el-textarea__inner {
	  	  border: 2px solid #797979;
	  	  border-radius: 4px;
	  	  padding: 12px;
	  	  outline: none;
	  	  color: rgba(121, 121, 121, 1);
	  	  width: 100%;
	  	  font-size: 14px;
	  	  height: 120px;
	  	}
</style>
