package com.liferay.sales.demo.module.portlet;

import com.liferay.portal.configuration.metatype.bnd.util.ConfigurableUtil;
import com.liferay.sales.demo.module.constants.SalesDemoModulePortletKeys;

import com.liferay.frontend.js.loader.modules.extender.npm.NPMResolver;
import com.liferay.portal.kernel.portlet.bridges.mvc.MVCPortlet;

import java.io.IOException;

import javax.portlet.Portlet;
import javax.portlet.PortletException;
import javax.portlet.RenderRequest;
import javax.portlet.RenderResponse;

import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;

import java.util.Map;
import org.osgi.service.component.annotations.Activate;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Modified;

/**
 * @author hhasan
 */
@Component(
	configurationPid = "com.liferay.sales.demo.module.portlet.SalesDemoModuleConfig",
	immediate = true,
	property = {
		"com.liferay.portlet.display-category=Sales POCs",
		"com.liferay.portlet.header-portlet-css=/css/index.css",
		"javax.portlet.display-name=Sales React Module",
		"com.liferay.portlet.instanceable=true",
		"javax.portlet.init-param.template-path=/",
		"javax.portlet.init-param.view-template=/view.jsp",
		"javax.portlet.name=" + SalesDemoModulePortletKeys.SALES_DEMO_NAME,
		"javax.portlet.resource-bundle=content.Language",
		"javax.portlet.security-role-ref=power-user,user"
	},
	service = Portlet.class
)
public class SalesDemoModulePortlet extends MVCPortlet {

	@Override
	public void doView(
			RenderRequest renderRequest, RenderResponse renderResponse)
		throws IOException, PortletException {
			
		renderRequest.setAttribute(
			"mainRequire",
			_npmResolver.resolveModuleName("lr-sales-demo-module") + " as main");

		renderRequest.setAttribute(
			SalesDemoModuleConfig.class.getName(),
			_salesDemoModuleConfig);

		super.doView(renderRequest, renderResponse);
	}

	@Activate
    @Modified
    protected void activate(Map<Object, Object> properties) { 
        _salesDemoModuleConfig = ConfigurableUtil.createConfigurable(SalesDemoModuleConfig.class, properties);        
	}

	@Reference
	private NPMResolver _npmResolver;

	private volatile SalesDemoModuleConfig _salesDemoModuleConfig;  
}