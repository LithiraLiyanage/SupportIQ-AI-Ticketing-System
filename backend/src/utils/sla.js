const SLA_RULES={critical:{firstResponseHours:1,resolutionHours:6},high:{firstResponseHours:4,resolutionHours:24},medium:{firstResponseHours:12,resolutionHours:48},low:{firstResponseHours:24,resolutionHours:72}};
const calculateSlaDueAt=(priority)=>{const rule=SLA_RULES[String(priority||"medium").toLowerCase()]||SLA_RULES.medium;const d=new Date();d.setHours(d.getHours()+rule.resolutionHours);return d};
module.exports={SLA_RULES,calculateSlaDueAt};
