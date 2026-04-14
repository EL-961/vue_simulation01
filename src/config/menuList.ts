import type { MenuGroup } from '../types/menu'

const API_BASE = 'http://127.0.0.1:8080/frsocfs'

export const menuList: MenuGroup[] = [
    {
        title: '核心查询',
        key: 'core',
        children: [
            {
                title: '报文主表',
                key: 'messageMain',
                view: 'table',
                api: `${API_BASE}/api/common/data/list`,
                tbl: 'sa_msg_proxy',
                fields:
                    'id,serial_number,msg_type,msg_send_time,res_code,res_msg,res_time,check_status,data_total_num,data_error_num,org_code',
                columns: [
                    { label: 'ID', prop: 'id' },
                    { label: '流水号', prop: 'serial_number' },
                    { label: '报文类型', prop: 'msg_type' },
                    { label: '发送时间', prop: 'msg_send_time' },
                    { label: '响应码', prop: 'res_code' },
                    { label: '响应信息', prop: 'res_msg' },
                    { label: '响应时间', prop: 'res_time' },
                    { label: '校验状态', prop: 'check_status' },
                    { label: '总条数', prop: 'data_total_num' },
                    { label: '错误条数', prop: 'data_error_num' },
                    { label: '机构编码', prop: 'org_code' }
                ]
            },
            {
                title: '统计汇总',
                key: 'summaryStats',
                view: 'table',
                api: `${API_BASE}/api/common/data/list`,
                tbl: 'sa_msg_proxy_count',
                fields:
                    'id,count_date,count_type,msg_type,right_num,error_num,org_code',
                columns: [
                    { label: 'ID', prop: 'id' },
                    { label: '统计日期', prop: 'count_date' },
                    { label: '统计类型', prop: 'count_type' },
                    { label: '报文类型', prop: 'msg_type' },
                    { label: '正确数', prop: 'right_num' },
                    { label: '错误数', prop: 'error_num' },
                    { label: '机构编码', prop: 'org_code' }
                ]
            },
            {
                title: '重发记录',
                key: 'resendRecord',
                view: 'table',
                api: `${API_BASE}/api/common/data/list`,
                tbl: 'sa_msg_proxy_resend',
                fields:
                    'id,serial_number,msg_type,resend_time,send_status,data_total_num,org_code,create_time',
                columns: [
                    { label: 'ID', prop: 'id' },
                    { label: '流水号', prop: 'serial_number' },
                    { label: '报文类型', prop: 'msg_type' },
                    { label: '重发时间', prop: 'resend_time' },
                    { label: '发送状态', prop: 'send_status' },
                    { label: '数据条数', prop: 'data_total_num' },
                    { label: '机构编码', prop: 'org_code' },
                    { label: '创建时间', prop: 'create_time' }
                ]
            },
            {
                title: '预警信息',
                key: 'warningInfo',
                view: 'table',
                api: `${API_BASE}/api/common/data/list`,
                tbl: 'sa_warning_info',
                fields: 'id,msg_type,time_type,miss_time,org_code,create_time',
                columns: [
                    { label: 'ID', prop: 'id' },
                    { label: '报文类型', prop: 'msg_type' },
                    { label: '时间类型', prop: 'time_type' },
                    { label: '缺失时间', prop: 'miss_time' },
                    { label: '机构编码', prop: 'org_code' },
                    { label: '创建时间', prop: 'create_time' }
                ]
            }
        ]
    },
    {
        title: '明细数据',
        key: 'detail',
        children: [
            {
                title: '网络攻击',
                key: 'networkAttack',
                view: 'table',
                api: `${API_BASE}/api/common/data/list`,
                tbl: 'sa_msg_net_attack',
                fields:
                    'id,time,institution_code,institution_short,source_ip,source_port,protocol,destination_ip,destination_port,target_system,attack_type,attack_type_sub,is_banned,is_blocked,msg_send_time,sa_net_attack_err_msg',
                columns: [
                    { label: 'ID', prop: 'id' },
                    { label: '发生时间', prop: 'time' },
                    { label: '机构代码', prop: 'institution_code' },
                    { label: '机构简称', prop: 'institution_short' },
                    { label: '攻击源IP', prop: 'source_ip' },
                    { label: '源端口', prop: 'source_port' },
                    { label: '协议', prop: 'protocol' },
                    { label: '目标IP', prop: 'destination_ip' },
                    { label: '目标端口', prop: 'destination_port' },
                    { label: '目标系统', prop: 'target_system' },
                    { label: '攻击类型', prop: 'attack_type' },
                    { label: '攻击子类', prop: 'attack_type_sub' },
                    { label: '已封禁', prop: 'is_banned' },
                    { label: '已阻断', prop: 'is_blocked' },
                    { label: '报送时间', prop: 'msg_send_time' },
                    { label: '错误信息', prop: 'sa_net_attack_err_msg' }
                ]
            },
            {
                title: 'DDOS攻击',
                key: 'ddosAttack',
                view: 'table',
                api: `${API_BASE}/api/common/data/list`,
                tbl: 'sa_msg_ddos',
                fields:
                    'id,time,institution_code,institution_short,destination_ip,target_system,attack_type,attack_type_sub,attack_flow,source_ip,msg_send_time,sa_ddos_err_msg',
                columns: [
                    { label: 'ID', prop: 'id' },
                    { label: '发生时间', prop: 'time' },
                    { label: '机构代码', prop: 'institution_code' },
                    { label: '机构简称', prop: 'institution_short' },
                    { label: '目标IP', prop: 'destination_ip' },
                    { label: '目标系统', prop: 'target_system' },
                    { label: '攻击类型', prop: 'attack_type' },
                    { label: '攻击子类', prop: 'attack_type_sub' },
                    { label: '攻击流量', prop: 'attack_flow' },
                    { label: '攻击源IP', prop: 'source_ip' },
                    { label: '报送时间', prop: 'msg_send_time' },
                    { label: '错误信息', prop: 'sa_ddos_err_msg' }
                ]
            },
            {
                title: '病毒感染',
                key: 'virusInfection',
                view: 'table',
                api: `${API_BASE}/api/common/data/list`,
                tbl: 'sa_msg_virus',
                fields:
                    'id,time,institution_code,institution_short,institution_branch,device_address,device_name,virus_hashcode,hash_name,virus_type,virus_name,anti_virus_product,device_type,state,msg_send_time,sa_virus_err_msg',
                columns: [
                    { label: 'ID', prop: 'id' },
                    { label: '发生时间', prop: 'time' },
                    { label: '机构代码', prop: 'institution_code' },
                    { label: '机构简称', prop: 'institution_short' },
                    { label: '分支机构', prop: 'institution_branch' },
                    { label: '感染设备IP', prop: 'device_address' },
                    { label: '设备主机名', prop: 'device_name' },
                    { label: '病毒哈希', prop: 'virus_hashcode' },
                    { label: '哈希算法', prop: 'hash_name' },
                    { label: '病毒类型', prop: 'virus_type' },
                    { label: '病毒名称', prop: 'virus_name' },
                    { label: '防病毒产品', prop: 'anti_virus_product' },
                    { label: '设备类型', prop: 'device_type' },
                    { label: '处置状态', prop: 'state' },
                    { label: '报送时间', prop: 'msg_send_time' },
                    { label: '错误信息', prop: 'sa_virus_err_msg' }
                ]
            },
            {
                title: '防病毒安装数',
                key: 'antivirusInstall',
                view: 'table',
                api: `${API_BASE}/api/common/data/list`,
                tbl: 'sa_msg_virus_device',
                fields:
                    'id,time,institution_code,institution_short,device_total,msg_send_time,sa_virus_device_err_msg',
                columns: [
                    { label: 'ID', prop: 'id' },
                    { label: '发生时间', prop: 'time' },
                    { label: '机构代码', prop: 'institution_code' },
                    { label: '机构简称', prop: 'institution_short' },
                    { label: '设备总数', prop: 'device_total' },
                    { label: '报送时间', prop: 'msg_send_time' },
                    { label: '错误信息', prop: 'sa_virus_device_err_msg' }
                ]
            },
            {
                title: '恶意邮件',
                key: 'maliciousMail',
                view: 'table',
                api: `${API_BASE}/api/common/data/list`,
                tbl: 'sa_msg_malice_mail',
                fields:
                    'id,time,institution_code,institution_short,addresser,addresser_source_ip,addressee,mail_title,mail_url,mail_attach_hashcode,hash_name,msg_send_time,sa_malice_mail_err_msg',
                columns: [
                    { label: 'ID', prop: 'id' },
                    { label: '发生时间', prop: 'time' },
                    { label: '机构代码', prop: 'institution_code' },
                    { label: '机构简称', prop: 'institution_short' },
                    { label: '发件人', prop: 'addresser' },
                    { label: '发件源IP', prop: 'addresser_source_ip' },
                    { label: '收件人', prop: 'addressee' },
                    { label: '邮件标题', prop: 'mail_title' },
                    { label: '邮件URL', prop: 'mail_url' },
                    { label: '附件哈希', prop: 'mail_attach_hashcode' },
                    { label: '哈希算法', prop: 'hash_name' },
                    { label: '报送时间', prop: 'msg_send_time' },
                    { label: '错误信息', prop: 'sa_malice_mail_err_msg' }
                ]
            },
            {
                title: '反垃圾邮件',
                key: 'antiSpamMail',
                view: 'table',
                api: `${API_BASE}/api/common/data/list`,
                tbl: 'sa_msg_garbage_mail',
                fields:
                    'id,time,institution_code,institution_short,intercept_total,msg_send_time,sa_garbage_mail_err_msg',
                columns: [
                    { label: 'ID', prop: 'id' },
                    { label: '发生时间', prop: 'time' },
                    { label: '机构代码', prop: 'institution_code' },
                    { label: '机构简称', prop: 'institution_short' },
                    { label: '垃圾邮件总数', prop: 'intercept_total' },
                    { label: '报送时间', prop: 'msg_send_time' },
                    { label: '错误信息', prop: 'sa_garbage_mail_err_msg' }
                ]
            },
            {
                title: '钓鱼网站/假冒APP',
                key: 'phishingApp',
                view: 'table',
                api: `${API_BASE}/api/common/data/list`,
                tbl: 'sa_msg_phishing',
                fields:
                    'id,time,institution_code,institution_short,fake_domain_name,fake_url,fake_ip,befaked_domain_name,fake_app_download,befaked_app,phishing_type,msg_send_time,sa_phishing_err_msg',
                columns: [
                    { label: 'ID', prop: 'id' },
                    { label: '发生时间', prop: 'time' },
                    { label: '机构代码', prop: 'institution_code' },
                    { label: '机构简称', prop: 'institution_short' },
                    { label: '假冒域名', prop: 'fake_domain_name' },
                    { label: '假冒URL', prop: 'fake_url' },
                    { label: '假冒IP', prop: 'fake_ip' },
                    { label: '被仿冒域名', prop: 'befaked_domain_name' },
                    { label: 'APP下载地址', prop: 'fake_app_download' },
                    { label: '被仿冒APP', prop: 'befaked_app' },
                    { label: '类型', prop: 'phishing_type' },
                    { label: '报送时间', prop: 'msg_send_time' },
                    { label: '错误信息', prop: 'sa_phishing_err_msg' }
                ]
            },
            {
                title: '黑设备指纹',
                key: 'blackDeviceFingerprint',
                view: 'table',
                api: `${API_BASE}/api/common/data/list`,
                tbl: 'sa_msg_dev_fp',
                fields:
                    'id,time,dev_id,method,risk_level,institution_code,institution_short,platform,device_fp,fp_alg,is_victim,last_active_time,msg_send_time,sa_dev_fp_err_msg',
                columns: [
                    { label: 'ID', prop: 'id' },
                    { label: '发生时间', prop: 'time' },
                    { label: '设备ID', prop: 'dev_id' },
                    { label: '更新方式', prop: 'method' },
                    { label: '风险等级', prop: 'risk_level' },
                    { label: '机构代码', prop: 'institution_code' },
                    { label: '机构简称', prop: 'institution_short' },
                    { label: '平台类型', prop: 'platform' },
                    { label: '设备指纹', prop: 'device_fp' },
                    { label: '指纹提供商', prop: 'fp_alg' },
                    { label: '是否受害者', prop: 'is_victim' },
                    { label: '最后活跃时间', prop: 'last_active_time' },
                    { label: '报送时间', prop: 'msg_send_time' },
                    { label: '错误信息', prop: 'sa_dev_fp_err_msg' }
                ]
            },
            {
                title: '黑设备封禁',
                key: 'blackDeviceBan',
                view: 'table',
                api: `${API_BASE}/api/common/data/list`,
                tbl: 'sa_msg_dev_block',
                fields:
                    'id,time,institution_code,institution_short,block_time,dev_id,msg_send_time,sa_dev_block_err_msg',
                columns: [
                    { label: 'ID', prop: 'id' },
                    { label: '发生时间', prop: 'time' },
                    { label: '机构代码', prop: 'institution_code' },
                    { label: '机构简称', prop: 'institution_short' },
                    { label: '封禁时间', prop: 'block_time' },
                    { label: '设备ID', prop: 'dev_id' },
                    { label: '报送时间', prop: 'msg_send_time' },
                    { label: '错误信息', prop: 'sa_dev_block_err_msg' }
                ]
            }
        ]
    },
    {
        title: '接口辅助',
        key: 'apiHelper',
        children: [
            {
                title: '字段查看',
                key: 'fieldView',
                view: 'columns',
                api: `${API_BASE}/api/common/data/columns`,
                tbl: 'sa_msg_proxy'
            },
            {
                title: '单条详情',
                key: 'singleDetail',
                view: 'detail',
                api: `${API_BASE}/api/common/data/detail`,
                tbl: 'sa_msg_proxy'
            },
            {
                title: 'JSON调试',
                key: 'jsonDebug',
                view: 'json',
                api: `${API_BASE}/api/common/data/list`,
                tbl: 'sa_msg_proxy',
                fields: 'id,serial_number,msg_type,msg_send_time,res_code'
            },
            {
                title: '健康检查',
                key: 'healthCheck',
                view: 'health',
                api: `${API_BASE}/api/common/health`
            }
        ]
    }
]