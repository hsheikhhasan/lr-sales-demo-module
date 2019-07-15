package com.liferay.sales.demo.module.portlet;

import com.liferay.portal.kernel.portlet.ConfigurationAction;
import com.liferay.portal.kernel.portlet.DefaultConfigurationAction;
import com.liferay.portal.kernel.util.ParamUtil;
import org.osgi.service.component.annotations.Activate;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.ConfigurationPolicy;
import org.osgi.service.component.annotations.Modified;

import javax.portlet.ActionRequest;
import javax.portlet.ActionResponse;
import javax.portlet.PortletConfig;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Map;

import com.liferay.sales.demo.module.constants.SalesDemoModulePortletKeys;
import com.liferay.portal.configuration.metatype.bnd.util.ConfigurableUtil;

import com.liferay.asset.kernel.exception.VocabularyNameException;
import com.liferay.asset.kernel.model.AssetVocabulary;
import com.liferay.asset.kernel.service.AssetCategoryLocalServiceUtil;
import com.liferay.asset.kernel.service.AssetVocabularyLocalServiceUtil;
import com.liferay.asset.kernel.model.AssetCategory;

import java.util.List;

/**
 * @author hhasan
 */
@Component(
    configurationPid = "com.liferay.sales.demo.module.portlet.SalesDemoModuleConfig",
    configurationPolicy = ConfigurationPolicy.OPTIONAL,
    immediate = true,
    property = {
        "javax.portlet.name=" + SalesDemoModulePortletKeys.SALES_DEMO_NAME,
    },
    service = ConfigurationAction.class
)
public class SalesDemoModuleConfigAction extends DefaultConfigurationAction {
    @Override
    public void include(
            PortletConfig portletConfig, HttpServletRequest httpServletRequest,
            HttpServletResponse httpServletResponse) throws Exception {

        httpServletRequest.setAttribute(
             SalesDemoModuleConfig.class.getName(), _salesDemoModuleConfig);

        setCategories(httpServletRequest);

        super.include(portletConfig, httpServletRequest, httpServletResponse);
    }

    @Override
    public void processAction(
            PortletConfig portletConfig, ActionRequest actionRequest,
            ActionResponse actionResponse)
            throws Exception {

        String preferredLocation = ParamUtil.getString(actionRequest, "preferredLocation");
        String vocabularyId = ParamUtil.getString(actionRequest, "vocabularyId");
        String structureId = ParamUtil.getString(actionRequest, "structureId");
        String headlessApis = ParamUtil.getString(actionRequest, "headlessApis");
 
        setPreference(actionRequest, "preferredLocation", preferredLocation);
        setPreference(actionRequest, "vocabularyId", vocabularyId);
        setPreference(actionRequest, "structureId", structureId);
        setPreference(actionRequest, "headlessApis", headlessApis);

        super.processAction(portletConfig, actionRequest, actionResponse);
    }

    @Activate
    @Modified
    protected void activate(Map<Object, Object> properties) {
        _salesDemoModuleConfig = ConfigurableUtil.createConfigurable(
            SalesDemoModuleConfig.class, properties);
    }

    private void setCategories(HttpServletRequest httpServletRequest) {
		List<AssetVocabulary> vocabularies = AssetVocabularyLocalServiceUtil.getAssetVocabularies(0, AssetVocabularyLocalServiceUtil.getAssetVocabulariesCount());
		AssetVocabulary assetVocabulary = null;
		for(AssetVocabulary vocabulary : vocabularies) {
			if (vocabulary.getName().equalsIgnoreCase("locations")) {
				assetVocabulary = vocabulary;
				break;
			}
		}
		if (assetVocabulary != null) {
			httpServletRequest.setAttribute("categories", assetVocabulary.getCategories());
		}		
	}

    private volatile SalesDemoModuleConfig _salesDemoModuleConfig;
}
