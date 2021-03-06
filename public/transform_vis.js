import 'plugins/transform_vis/transform_vis.less';
import 'plugins/transform_vis/transform_vis_controller';
import TemplateVisTypeTemplateVisTypeProvider from 'ui/template_vis_type/template_vis_type';
import transformVisTemplate from 'plugins/transform_vis/transform_vis.html';
import transformVisParamsTemplate from 'plugins/transform_vis/transform_vis_params.html';


// register the provider with the visTypes registry
require('ui/registry/vis_types').register(TransformVisProvider);

function TransformVisProvider(Private) {
  const TemplateVisType = Private(TemplateVisTypeTemplateVisTypeProvider);

  return new TemplateVisType({
    name: 'transform',
    title: 'Transform',
    description: 'Transfom query results to custom HTML using template language',
    icon: 'fa-exchange',
    template: transformVisTemplate,
    params: {
      defaults: {
	outputs : {
         meta: '({\n count_hits: function() {\n  return this.hits.total;\n }\n})',
         querydsl: '{\n "query": {\n  "bool": {\n   "must": [\n   ' + 
            '  "_DASHBOARD_CONTEXT_"\n   ]\n  }\n }\n}',
         formula: '<hr>{{hits.total}} total hits<hr>'
	}
      },
      editor: transformVisParamsTemplate
    },
    implementsRenderComplete: true,
    requiresSearch: false,
    requiresIndexPatternSelection: true
  });
}

// export the provider so that the visType can be required with Private()
export default TransformVisProvider;
