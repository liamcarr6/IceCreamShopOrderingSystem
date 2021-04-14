<template>
  <div>
    <h2>Order Online</h2>
    <el-form ref="form" :model="form" label-width="150px">
      <el-form-item
        label="Flavour"
        prop="iceCreamId"
        :rules="[{ required: true, message: 'please select flavour' }]"
      >
        <el-select v-model="form.iceCreamId">
          <el-option
            v-for="(item, index) in flavours"
            :key="index"
            :value="item.value"
            :label="item.label"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        label="Size"
        prop="priceId"
        :rules="[{ required: true, message: 'please select size' }]"
      >
        <el-select v-model="form.priceId">
          <el-option
            v-for="(item, index) in sizes"
            :key="index"
            :value="item.value"
            :label="item.label"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="price">
        <el-input disabled v-model="price"></el-input>
      </el-form-item>
      <el-form-item
        label="mobile"
        prop="contact"
        :rules="[{ required: true, message: 'please input mobile phone' }]"
      >
        <el-input v-model="form.contact"></el-input>
      </el-form-item>
      <el-form-item label="address" prop="addressId">
<!--        <el-select v-model="form.addressId">-->
<!--          <el-option-->
<!--            v-for="(item, index) in addressData"-->
<!--            :key="index"-->
<!--            :value="item.id"-->
<!--            :label="item.description"-->
<!--          ></el-option>-->
<!--        </el-select>-->
        <div style="width: 80%;height: 300px;">
          <l-map :zoom="zoom" @click="handleMapClick">
            <l-marker :lat-lng="shopPosition" :icon="icon">
              <l-popup>
                Shop
              </l-popup>
            </l-marker>
            <l-marker
                    v-if="myPosition"
                    :lat-lng="myPosition"
                    :icon="locationIcon"
            ></l-marker>
            <l-tile-layer
                    :max-zoom="18"
                    url="https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw"
            >
            </l-tile-layer>
          </l-map>

        </div>
      </el-form-item>
      <el-form-item prop="type" label="type">
        <el-radio v-model="form.type" :label="1">delivery</el-radio>
        <el-radio v-model="form.type" :label="0">collection</el-radio>
      </el-form-item>
      <el-form-item>
        <el-button :disabled="disabledOrder" type="primary" @click="handleOrder">Add to Cart</el-button>
        <el-button @click="handleCancel">Cancel</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { axios } from "../../../http/request";
import { LMap, LTileLayer, LMarker, LPopup } from "vue2-leaflet";
import { icon, latLng } from "leaflet";
import "leaflet/dist/leaflet.css";

export default {
  name: "OrderIndex",
  components: { LMarker, LMap, LTileLayer, LPopup},
  data() {
    return {
      form: {
        iceCreamId: undefined,
        priceId: undefined,
        addressId: undefined,
        type: 1,
        address: undefined
      },
      flavours: [
        {
          label: "Plain vanilla",
          value: 1,
          price: 0
        },
        {
          label: "Honeycomb",
          value: 2,
          price: 0
        },
        {
          label: "Rum and Raisin",
          value: 3,
          price: 0
        },
        {
          label: "Mint",
          value: 4,
          price: 0
        },
        {
          label: "Cherry",
          value: 5,
          price: 0
        },
        {
          label: "Chocolate",
          value: 6,
          price: 0
        },
        {
          label: "Salted Caramel",
          value: 7,
          price: 0.75
        },
        {
          label: "Strawberry",
          value: 8,
          price: 0
        }
      ],
      sizes: [
        {
          label: "Small",
          value: 1,
          price: 1.75
        },
        {
          label: "Medium",
          value: 2,
          price: 2.25
        },
        {
          label: "Large",
          value: 3,
          price: 2.75
        },
        {
          label: "Extra Large",
          value: 4,
          price: 3.5
        },
        {
          label: "Extra Extra Large",
          value: 5,
          price: 5.75
        }
      ],
      addressData: [],
      zoom: 2,
      shopPosition: latLng(55.07274, -1.52500),
      myPosition: null,
      icon: icon({
        iconUrl: require("./ice-icon.png"),
        iconSize: [32, 37],
        iconAnchor: [16, 37]
      }),
      locationIcon: icon({
        iconUrl: require("./location.png"),
        iconSize: [32, 37],
        iconAnchor: [16, 37]
      }),
      MAX_METER: 8046.72,
      disabledOrder: false
    };
  },
  computed: {
    price() {
      let f = this.flavours.find(item => item.value == this.form.icCreamId);
      let s = this.sizes.find(item => item.value == this.form.priceId);
      return (f ? f.price || 0 : 0) + (s ? s.price || 0 : 0);
    }
  },
  mounted() {
    this.getAddressData();
    // this.initMap();
  },
  methods: {
    handleCancel() {
      this.$refs["form"].resetFields();
    },

    handleMapClick(e) {
      console.log("map", e);
      this.myPosition = latLng(e.latlng.lat, e.latlng.lng);
      let distance = this.myPosition.distanceTo(this.shopPosition);
      if(distance > this.MAX_METER) {
        this.$message.error("beyond 5 miles");
        this.disabledOrder = true;
      } else {
        this.disabledOrder = false;
      }
    },

    handleOrder() {
      let form = this.$refs["form"];
      form.validate(valid => {
        if (valid) {
          console.log(valid);
          this.form.address = this.myPosition.toString();
          console.log(this.form);
          this.addOrder({ ...this.form }).then(res => {
            if (res.flag) {
              this.$message.success(res.message);
            } else {
              this.$message.error(res.message);
            }
          });
        }
      });
    },
    getAddressData() {
      this.listAddressApi().then(res => {
        if (res.flag) {
          this.addressData = res.data.filter(item => {
            return item.valid == 1;
          });
        }
      });
    },
    listAddressApi() {
      return axios({
        url: "/address/list",
        method: "get"
      });
    },
    addOrder(data) {
      return axios({
        url: "/order/ice-cream",
        method: "post",
        data
      });
    }
  }
};
</script>
<style lang="less" scoped></style>
