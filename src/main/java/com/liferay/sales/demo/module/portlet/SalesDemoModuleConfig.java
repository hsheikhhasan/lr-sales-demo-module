package com.liferay.sales.demo.module.portlet;

import aQute.bnd.annotation.metatype.Meta;

@Meta.OCD(id = "com.liferay.sales.demo.module.portlet.SalesDemoModuleConfig")
public interface SalesDemoModuleConfig {
    @Meta.AD(
        required = false
    )
    public String preferredLocation();
    
    @Meta.AD(
        required = false
    )
    public String vocabularyId();

    @Meta.AD(
        required = false
    )
    public String structureId();

    @Meta.AD(
        required = false
    )
    public String headlessApis();
}
