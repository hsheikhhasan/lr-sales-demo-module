<%@ include file="./init.jsp" %>

<liferay-portlet:actionURL portletConfiguration="<%= true %>" var="configurationActionURL" />

<liferay-portlet:renderURL portletConfiguration="<%= true %>" var="configurationRenderURL" />

<div style="width: 50%; margin: 20px 0 0 40px">
    <aui:form action="<%= configurationActionURL %>" method="post" name="fm">
        <aui:input name="<%= Constants.CMD %>" type="hidden" value="<%= Constants.UPDATE %>" />
        <aui:input name="redirect" type="hidden" vlue="<%=configurationRenderURL%>" />

        <aui:fieldset>
            <aui:select name="preferredLocation" label="Preferred Location"value="<%= preferredLocation %>">
                <aui:option value="all">All Locations</aui:option>

            	<c:forEach items="${categories}" var="category" varStatus="counter">
                    <c:if test = "${!category.rootCategory}">
                        <aui:option value="${category.name}-${category.parentCategory.name}">${category.name}-${category.parentCategory.name}</aui:option>
                    </c:if>
                </c:forEach>
            </aui:select>

            <aui:input name="vocabularyId" label="Vocabulary ID" type="text" value="<%= vocabularyId %>" />
            <aui:input name="structureId" label="Structure ID" type="text" value="<%= structureId %>" />

             <aui:select name="headlessApis" label="APIs Type"value="<%= headlessApis %>">
                <aui:option value="rest">REST APIs</aui:option>
                <aui:option value="pre">7.1/ 7.2 JSON-WS APIs</aui:option>
                <aui:option value="post">7.2 Headless APIs</aui:option>
            </aui:select>
        </aui:fieldset>

        <aui:button-row>
            <aui:button type="submit"></aui:button>
        </aui:button-row>
    </aui:form>
</div>