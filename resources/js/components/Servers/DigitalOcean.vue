<template>
<div>
   <div style="">
      <div class="mt-5">
         <form role="form">
            <div class="form-group row">
               <label for="site_name" class="col-md-4 col-form-label text-md-right">Name</label> 
               <div class="col-md-6">
                 <input v-model="name" type="text" placeholder="Enter server name" class="form-control">
               </div>
            </div>
            <div class="form-group row">
               <label for="size" class="col-md-4 col-form-label text-md-right">Server Size</label> 
               <div class="col-md-6">
                  <!----> 
                  <select name="size" class="iona-select form-control">
                     <option value="01">1GB RAM - 1 CPU Core - 25GB SSD - $0.007 / Hour - $5 / Month</option>
                     <option value="02">1GB RAM - 3 CPU Core - 60GB SSD - $0.022 / Hour - $15 / Month</option>
                     <option value="03">2GB RAM - 1 CPU Core - 50GB SSD - $0.015 / Hour - $10 / Month</option>
                     <option value="04">2GB RAM - 2 CPU Core - 60GB SSD - $0.022 / Hour - $15 / Month</option>
                     <option value="05">3GB RAM - 1 CPU Cores - 60GB SSD - $0.022 / Hour - $15 / Month</option>
                     <option value="07">4GB RAM - 2 CPU Cores - 80GB SSD - $0.03 / Hour - $20 / Month</option>
                     <option value="08">8GB RAM - 4 CPU Cores - 160GB SSD - $0.06 / Hour - $40 / Month</option>
                     <option value="11">16GB RAM - 6 CPU Core - 320GB SSD - $0.119 / Hour - $80 / Month</option>
                     <option value="12">32GB RAM - 8 CPU Core - 640GB SSD - $0.238 / Hour - $160 / Month</option>
                     <option value="14">48GB RAM - 12 CPU Core - 960GB SSD - $0.356 / Hour - $240 / Month</option>
                     <option value="15">64GB RAM - 16 CPU Core - 1280GB SSD - $0.476 / Hour - $320 / Month</option>
                     <option value="17">96GB RAM - 20 CPU Core - 1920GB SSD - $0.714 / Hour - $480 / Month</option>
                     <option value="18">128GB RAM - 24 CPU Core - 2560GB SSD - $0.952 / Hour - $640 / Month</option>
                     <option value="19">192GB RAM - 32 CPU Core - 3840GB SSD - $1.428 / Hour - $960 / Month</option>
                     <option value="20">2GB RAM (High CPU) - 1 CPU Cores - 25GB SSD - $0.03 / Hour - $20 / Month</option>
                     <option value="06">4GB RAM (High CPU) - 2 CPU Cores - 25GB SSD - $0.06 / Hour - $40 / Month</option>
                     <option value="09">8GB RAM (High CPU) - 4 CPU Cores - 50GB SSD - $0.119 / Hour - $80 / Month</option>
                     <option value="10">16GB RAM (High CPU) - 8 CPU Cores - 1000GB SSD - $0.238 / Hour - $160 / Month</option>
                     <option value="13">32GB RAM (High CPU) - 16 CPU Core - 200GB SSD - $0.476 / Hour - $320 / Month</option>
                     <option value="16">64GB RAM (High CPU) - 32 CPU Core - 400GB SSD - $0.952 / Hour - $640 / Month</option>
                  </select>
                  <!----> <!---->
               </div>
            </div>
            <div class="form-group row">
               <label for="size" class="col-md-4 col-form-label text-md-right">Region</label> 
               <div class="col-md-6">
                  <select name="region" class="iona-select form-control">
                     <option value="ams2">Amsterdam 2</option>
                     <option value="ams3">Amsterdam 3</option>
                     <option value="blr1">Bangalore</option>
                     <option value="lon1">London</option>
                     <option value="fra1">Frankfurt</option>
                     <option value="nyc1">New York 1</option>
                     <option value="nyc2">New York 2</option>
                     <option value="nyc3">New York 3</option>
                     <option value="sfo1">San Francisco 1</option>
                     <option value="sfo2">San Francisco 2</option>
                     <option value="sgp1">Singapore</option>
                     <option value="tor1">Toronto</option>
                  </select>
               </div>
            </div>
            <div class="form-group row">
              <div class="offset-md-4 col-md-6">
                  <button class="btn btn-success">
                    <i class="fa fa-plus-circle mr-1"></i> Create Server
                  </button>
                  <button type="button" @click="$emit('close')" class="btn btn-secondary">Cancel</button>
              </div>
            </div>
         </form>
      </div>
   </div>
</div>
</template>

<script>
import generate from 'project-name-generator'

export default {
  data: () => ({
    name: generate({ number: true }).dashed,
  })
}
</script>
