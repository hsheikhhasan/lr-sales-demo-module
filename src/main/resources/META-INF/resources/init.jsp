<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<%@ taglib uri="http://java.sun.com/portlet_2_0" prefix="portlet" %>

<%@ taglib uri="http://liferay.com/tld/aui" prefix="aui" %>
<%@ taglib uri="http://liferay.com/tld/portlet" prefix="liferay-portlet" %>
<%@ taglib uri="http://liferay.com/tld/theme" prefix="liferay-theme" %>
<%@ taglib uri="http://liferay.com/tld/ui" prefix="liferay-ui" %>

<%@ page import="com.liferay.sales.demo.module.portlet.SalesDemoModuleConfig" %>
<%@ page import="com.liferay.portal.kernel.util.StringPool" %>
<%@ page import="com.liferay.portal.kernel.util.Validator" %>
<%@ page import="com.liferay.portal.kernel.util.Constants" %>

<liferay-theme:defineObjects />

<portlet:defineObjects />

<%
    String mainRequire = (String)renderRequest.getAttribute("mainRequire");

    SalesDemoModuleConfig exampleConfiguration =
            (SalesDemoModuleConfig)
                    renderRequest.getAttribute(SalesDemoModuleConfig.class.getName());

    String preferredLocation = StringPool.BLANK;
    String vocabularyId = StringPool.BLANK;
    String structureId = StringPool.BLANK;
    String headlessApis = StringPool.BLANK;

    if (Validator.isNotNull(exampleConfiguration)) {
        preferredLocation =
                portletPreferences.getValue(
                        "preferredLocation", exampleConfiguration.preferredLocation());

        vocabularyId =
                portletPreferences.getValue(
                        "vocabularyId", exampleConfiguration.vocabularyId());
        structureId =
                portletPreferences.getValue(
                        "structureId", exampleConfiguration.structureId());
        headlessApis =
                portletPreferences.getValue(
                        "headlessApis", exampleConfiguration.headlessApis());
    }
%>