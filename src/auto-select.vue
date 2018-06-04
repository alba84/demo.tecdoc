<template>
    <div id="app">
        <el-container>
            <el-aside width="250px">
                <el-card class="box-card" shadow="never" v-if="modification_detail">
                    <div slot="header" class="clearfix">
                        <span>{{ modification_detail.fulldescription }}</span>
                    </div>
                    <div  v-if="modification_detail">
                        <div v-for="(group, group_code) in modification_detail.attributes">
                            <div class="group_text item">{{ group_code }}</div>
                            <div v-for="(attr, attr_code) in group"  class="text item">
                                {{ attr.title }}: {{ attr.value }}
                            </div>
                        </div>
                    </div>
                </el-card>
            </el-aside>
            
            <el-container>
                <el-header style="text-align: right; font-size: 12px">
                    <el-row :gutter="10">
                        <el-col :xs="8" :sm="6" :md="4" :lg="6" :xl="1">
                            <div class="grid-content bg-purple">
                                <el-select name="select-type" placeholder="Тип" v-model="type" v-on:change="setType" filterable>
                                    <el-option
                                        v-for="item in gstate.types"
                                        :key="item.code"
                                        :label="item.name"
                                        :value="item.code">
                                    </el-option>
                                </el-select>
                            </div>
                        </el-col>
                        <el-col :xs="4" :sm="6" :md="8" :lg="6" :xl="11">
                            <div class="grid-content bg-purple-light">
                                <el-select name="select-manufacturer" placeholder="Марка" v-model="manufacturer" v-on:change="setManufacturer" filterable :disabled="gstate.manufacturers.length <= 0">
                                    <el-option
                                        v-for="item in gstate.manufacturers"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.id">
                                    </el-option>
                                </el-select>
                            </div>
                        </el-col>
                        <el-col :xs="4" :sm="6" :md="8" :lg="6" :xl="11" v-if="type != 'engine'">
                            <div class="grid-content bg-purple">
                                <el-select name="select-model" placeholder="Модель" v-model="model" v-on:change="setModel" filterable :disabled="gstate.models.length <= 0">
                                    <el-option
                                        v-for="item in gstate.models"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.id">
                                    </el-option>
                                </el-select>
                            </div>
                        </el-col>
                        <el-col :xs="8" :sm="6" :md="4" :lg="6" :xl="1">
                            <div class="grid-content bg-purple-light">
                                <el-select name="select-modification" placeholder="Модификация" v-model="modification" v-on:change="setModification" filterable :disabled="gstate.modifications <= 0">
                                    <el-option
                                        v-for="item in gstate.modifications"
                                        :key="item.id"
                                        :label="item.fulldescription"
                                        :value="item.id">
                                    </el-option>
                                </el-select>
                            </div>
                        </el-col>
                    </el-row>
                </el-header>
                
                <el-main>
                    <!-- div v-if="gstate.type">Тип: {{ gstate.type }}</div>
                    <div v-if="gstate.manufacturer">Марка: {{ gstate.manufacturer }}</div>
                    <div v-if="gstate.model">Модель: {{ gstate.model }}</div>
                    <div v-if="gstate.modification">Модификация: {{ gstate.modification }}</div>
                    <div v-if="gstate.section">Раздел: {{ gstate.section }}</div>
                    <div v-if="gstate.part">Артикул: {{ gstate.part }}</div -->

                    <el-tree v-show="gstate.sections.length > 0" :data="gstate.sections" :props="sectionTreeProps" @node-click="setSection"></el-tree>

                    <el-dialog title="Подходящие артикулы" :visible.sync="popupPartsVisible">
                        <el-table v-show="gstate.parts.length > 0" :data="gstate.parts" style="width: 100%">
                            <el-table-column fixed prop="supplier_name" label="Производитель" width="150"></el-table-column>
                            <el-table-column fixed prop="part_number" label="Артикул" width="150"></el-table-column>
                            <el-table-column prop="product_name" label="Название"></el-table-column>
                            <el-table-column fixed="right" label="Дополнительно" width="150" align="center">
                            <template slot-scope="scope">
                                <el-tooltip class="item" content="Информация" placement="top">
                                    <i class="el-icon-info" @click="getPartInfo(scope.row)" style="margin:0 7px 0 7px;"></i>
                                </el-tooltip>

                                <el-tooltip class="item" content="Применимость" placement="top">
                                    <i class="el-icon-success" @click="getAppliance(scope.row)" style="margin:0 7px 0 7px;"></i>
                                </el-tooltip>

                                <el-tooltip class="item" content="Аналоги" placement="top">
                                    <i class="el-icon-refresh" @click="getCross(scope.row)" style="margin:0 7px 0 7px;"></i>
                                </el-tooltip>
                            </template>
                            </el-table-column>
                        </el-table>
                    </el-dialog>

                    <el-dialog title="Информация" :visible.sync="popupPartInfoVisible">
                        <el-table :data="partInfo">
                            <el-table-column fixed prop="displaytitle" label="Характеристика" width="200"></el-table-column>
                            <el-table-column fixed prop="displayvalue" label="Значение" width="200"></el-table-column>
                        </el-table>
                    </el-dialog>

                    <el-dialog title="Применимость" :visible.sync="popupPartApplianceVisible">
                        <el-table v-if="partAppliance.PassengerCar" :data="partAppliance.PassengerCar">
                            <el-table-column fixed prop="make" label="Марка"></el-table-column>
                            <el-table-column fixed prop="model" label="Модель"></el-table-column>
                            <el-table-column fixed prop="description" label="Модификация"></el-table-column>
                            <el-table-column fixed prop="constructioninterval" label="Годы выпуска"></el-table-column>
                        </el-table>
                        <el-table v-if="partAppliance.CommercialVehicle" :data="partAppliance.CommercialVehicle">
                            <el-table-column fixed prop="make" label="Марка"></el-table-column>
                            <el-table-column fixed prop="model" label="Модель"></el-table-column>
                            <el-table-column fixed prop="description" label="Модификация"></el-table-column>
                            <el-table-column fixed prop="constructioninterval" label="Годы выпуска"></el-table-column>
                        </el-table>
                        <el-table v-if="partAppliance.Motorbike" :data="partAppliance.Motorbike">
                            <el-table-column fixed prop="make" label="Марка"></el-table-column>
                            <el-table-column fixed prop="model" label="Модель"></el-table-column>
                            <el-table-column fixed prop="description" label="Модификация"></el-table-column>
                            <el-table-column fixed prop="constructioninterval" label="Годы выпуска"></el-table-column>
                        </el-table>
                        <el-table v-if="partAppliance.Engine" :data="partAppliance.Engine">
                            <el-table-column fixed prop="make" label="Марка"></el-table-column>
                            <el-table-column fixed prop="model" label="Модель"></el-table-column>
                            <el-table-column fixed prop="description" label="Модификация"></el-table-column>
                            <el-table-column fixed prop="constructioninterval" label="Годы выпуска"></el-table-column>
                        </el-table>
                        <el-table v-if="partAppliance.Axle" :data="partAppliance.Axle">
                            <el-table-column fixed prop="make" label="Марка"></el-table-column>
                            <el-table-column fixed prop="model" label="Модель"></el-table-column>
                            <el-table-column fixed prop="description" label="Модификация"></el-table-column>
                            <el-table-column fixed prop="constructioninterval" label="Годы выпуска"></el-table-column>
                        </el-table>
                    </el-dialog>

                    <el-dialog title="Аналоги" :visible.sync="popupPartCrossVisible">
                        <el-table :data="partCross">
                            <el-table-column fixed prop="description" label="Бренд"></el-table-column>
                            <el-table-column fixed prop="PartsDataSupplierArticleNumber" label="Артикул"></el-table-column>
                        </el-table>
                    </el-dialog>
                </el-main>
            </el-container>
        </el-container>        
    </div>
</template>

<style>
.group_text,
.text {
    font-size: 12px;
}

.group_text {
    font-weight: bold;
}

.item {
    margin-bottom: 12px;
}

.clearfix:before,
.clearfix:after {
    display: table;
}
</style>

<script>
/* eslint-disable */
import {API} from './api'

export default {
    name: 'auto-select',
    data() {
        return {
            gstate: this.$store.state,
            type: null,
            manufacturer: null            ,
            model: null,
            modification: null,
            section: null,
            part: null,
            partInfo: [],
            partAppliance: [],
            partCross: [],

            sectionTreeProps: {
                children: 'childs',
                label: 'description'
            },
            popupPartsVisible: false,
            popupPartInfoVisible: false,
            popupPartApplianceVisible: false,
            popupPartCrossVisible: false
        }
    },
    computed: {
        modification_detail() {
            if(!this.modification)
                return undefined;
            
            return this.gstate.modifications.find((el, i, arr) => {
                return el.id == this.gstate.modification
            }, this)
        }
    },
    created() {
        API.getTypes(response => {this.$store.set('types', response.data)})
    },
    methods:{
        reset(rtype, rmanufacturer, rmodel, rmodification, rsection, rparts){
            if(rtype)
            {
                this.$store.set('types', [])
                this.$store.set('type', null)
                this.type = null
            }

            if(rmanufacturer)
            {
                this.$store.set('manufacturers', [])
                this.$store.set('manufacturer', null)
                this.manufacturer = null
            }

            if(rmodel)
            {
                this.$store.set('models', [])
                this.$store.set('model', null)
                this.model = null
            }

            if(rmodification)
            {
                this.$store.set('modifications', [])
                this.$store.set('modification', null)
                this.modification = null
            }

            if(rsection)
            {
                this.$store.set('sections', [])
                this.$store.set('section', null)
                this.section = null
            }

            if(rparts)
            {
                this.$store.set('parts', [])
                this.$store.set('part', null)
                this.part = null
            }
        },
        setType(){
            this.reset(false, true, true, true, true, true)
            this.$store.set('type', this.type)
            API.getManufacturers(
                {type: this.type}, 
                response => {
                    this.$store.set('manufacturers', response.data)
                }
            )
        },
        setManufacturer(){
            this.$store.set('manufacturer', this.manufacturer)
            if( this.type != 'engine' )
            {
                this.reset(false, false, true, true, true, true)
                API.getModels(
                    {type: this.type, manufacturer: this.manufacturer}, 
                    response => {
                        this.$store.set('models', response.data)
                    }
                )
            }
            else
            {
                this.reset(false, false, false, true, true, true)
                API.getModifications(
                    {type: this.type, model: this.manufacturer}, 
                    response => {
                        this.$store.set('modifications', response.data)
                    }
                )
            }
        },
        setModel(){
            this.reset(false, false, false, true, true, true)
            this.$store.set('model', this.model)
            API.getModifications(
                {type: this.type, model: this.model}, 
                response => {
                    this.$store.set('modifications', response.data)
                }
            )
        },
        setModification(){
            this.reset(false, false, false, false, true, true)
            this.$store.set('modification', this.modification)
            API.getSections(
                {type: this.type, modification: this.modification}, 
                response => {
                    this.$store.set('sections', response.data)
                }
            )
        },

        setSection(data) {
            if(data.childs.length <= 0)
            {
                this.reset(false, false, false, false, false, true)
                this.section = data.id
                this.$store.set('section', data.id)
                API.getParts(
                    {type: this.type, modification: this.modification, section: this.section}, 
                    response => {
                        this.$store.set('parts', response.data)
                        this.popupPartsVisible = true
                    }
                )
            }
        },

        getPartInfo(row){
            API.getPartInfo(
                {supplier_id: row.supplier_id, number: row.part_number}, 
                response => {
                    this.partInfo = response.data;
                    this.popupPartInfoVisible = true
                }
            )
        },

        getAppliance(row){
            API.getAppliance(
                {supplier_id: row.supplier_id, number: row.part_number}, 
                response => {
                    this.partAppliance = response.data;
                    this.popupPartApplianceVisible = true
                }
            )
        },

        getCross(row){
            API.getCross(
                {supplier_id: row.supplier_id, number: row.part_number}, 
                response => {
                    this.partCross = response.data;
                    this.popupPartCrossVisible = true
                }
            )
        }
    }
}
</script>
