if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('sw.js').then(function(registration) {
            console.log('ServiceWorker registration successful with scope: ', registration.scope);
        }, function(err) {
            console.log('ServiceWorker registration failed: ', err);
        });
    });
}
const store = new Vuex.Store({
  state: {
    id: 0,
    persons: [],
    searchText: '',
    selectedPersonId: -1
  },
  getters: {
    reversedFilteredPersons: (state) => {
      if (state.searchText) {
        return state.persons.filter(
          element => {
            return element.id === parseInt(state.searchText) || element.location.indexOf(state.searchText) !== -1;
          }
        );
      }
      return state.persons.slice().reverse();
    },
    getSelectedPerson: (state) => {
      return state.persons[state.selectedPersonId];
    }
  },
  mutations: {
    setSelectedPersonId (state, id) {
      state.selectedPersonId = id;
    },
    updateSearchText(state, searchText) {
      state.searchText = searchText;
    },
    createPerson (state) {
      const newPerson = {
        id: state.id++,
        person1: {first: '', second: '', code: ''},
        person2: {first: '', second: '', code: ''},
        location: '',
        extras: [],
        basicFunc: [],
        overrideBasicFunc: false,
        giveHalfBasic: false,
        basicPoints: 0,
        extraPoints: 0,
        extraExtraPoints: 0,
        extraExtraReason: "",
        lateOneWeek: false,
        lateTwoWeeks: false,
        penaltyPoints: 0,
        plagiarism: false,
        plagiarismReason: "",
        currentTotal: 0
      }
      state.persons.push(newPerson);
    },
    updatePerson (state, person) {
      Vue.set(state.persons, person.id, person);
    }
  }
});

const add = {
  template: `
  <button v-on:click="createPerson" type="button" class="btn btn-primary btn-lg btn-block add-new">
    Lisa uus kaitsmine
  </button>`,
  methods: {
    createPerson: function () {
      store.commit('createPerson');
    }
  }
};

const search = {
  template: `
  <div class="input-group">
      <input :value="searchText" @input="updateSearchText"
      placeholder="Otsi" name="searchtext" class="form-control" type="text">
  </div>
  `,
  computed: {
    searchText () {
      return this.$store.state.searchText;
    }
  },
  methods: {
    updateSearchText: function(e) {
      this.$store.commit('updateSearchText', e.target.value)
    }
  }
};

const items = {
  template: `
  <div class="list-group">
    <button v-for="person in reversedFilteredPersons" :key="person.id"
    v-on:click="selectPerson(person.id)"
    v-bind:class="{ active: isActive(person.id), 'list-group-item-danger': person.plagiarism && !isActive(person.id), 'list-group-item-warning': (person.currentTotal < 10 || !person.location || person.location === '') && !isActive(person.id)}"
    type="button" class="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
      <span class="pull-right">{{person.location}}</span>
      <span class="badge badge-light badge-pill">{{person.currentTotal}}</span>
    </button>
  </div>
  `,
  computed: {
    reversedFilteredPersons: function () {
      return store.getters.reversedFilteredPersons;
    }
  },
  methods: {
    selectPerson: function (id) {
      store.commit('setSelectedPersonId', id);
    },
    isActive: function(id) {
      return id === this.$store.state.selectedPersonId;
    }
  }
};

const editview = {
  props: {
    selectedPerson: {
      default: null,
      type: Object
    }
  },
  watch: {
    selectedPerson: function () {
       this.person = this.selectedPerson;
    }
  },
  template: `
    <form v-if="selectedPerson">
      <div class="form-group card">
        <div class="card-header">
          Info
        </div>
        <div class="card-body">
          <h5 class="card-title">Töö asukoht</h5>
          <input v-model="person.location" v-on:keyup.stop="updatePerson()"
          type="text" class="form-control" id="location"
          placeholder="Asukoht">
          <h5 class="card-title mt-3">Kaitsja(d)</h5>
          <div class="form-row">
            <div class="form-group col-md-4">
              <label for="firstname1">Eesnimi</label>
              <input type="text" class="form-control" id="firstname1" placeholder="Eesnimi"  v-model="person.person1.first" v-on:keyup.stop="updatePerson()">
            </div>
            <div class="form-group col-md-4">
              <label for="secondname1">Perenimi</label>
              <input type="text" class="form-control" id="secondname1" placeholder="Perenimi" v-model="person.person1.second" v-on:keyup.stop="updatePerson()">
            </div>
            <div class="form-group col-md-4">
              <label for="studentcode1">Tudengi kood</label>
              <input type="text" class="form-control" id="studentcode1" placeholder="Tudengi kood" v-model="person.person1.code" v-on:keyup.stop="updatePerson()">
            </div>
          </div>
          <div class="form-row">
            <div class="form-group col-md-4">
              <label for="firstname2">Eesnimi</label>
              <input type="text" class="form-control" id="firstname2" placeholder="Eesnimi"  v-model="person.person2.first" v-on:keyup.stop="updatePerson()">
            </div>
            <div class="form-group col-md-4">
              <label for="secondname2">Perenimi</label>
              <input type="text" class="form-control" id="secondname2" placeholder="Perenimi" v-model="person.person2.second" v-on:keyup.stop="updatePerson()">
            </div>
            <div class="form-group col-md-4">
              <label for="studentcode2">Tudengi kood</label>
              <input type="text" class="form-control" id="studentcode2" placeholder="Tudengi kood" v-model="person.person2.code" v-on:keyup.stop="updatePerson()">
            </div>
          </div>
        </div>
      </div>
      <div class="form-group card">
        <div class="card-header">
          Baasfunktsionaalsus
        </div>
        <div class="card-body">
          <div class="form-check">
            <input class="form-check-input" type="checkbox" value="wait"
            id="wait" v-model="person.basicFunc" @change="updateBasic">
            <label class="form-check-label" for="wait">
              Ootejärjekord
            </label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="checkbox" value="sorting"
            id="sorting" v-model="person.basicFunc" @change="updateBasic">
            <label class="form-check-label" for="sorting">
              Sortimine (lohistamine või klõps)
            </label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="checkbox" value="extra"
            id="extra" v-model="person.basicFunc" @change="updateBasic">
            <label class="form-check-label" for="extra">
              Tähtajaline lisaülesanne
            </label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="checkbox" value="life"
            id="life" v-model="person.basicFunc" @change="updateBasic">
            <label class="form-check-label" for="life">
              Elude kaotamine
            </label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="checkbox" value="restart"
            id="restart" v-model="person.basicFunc" @change="updateBasic">
            <label class="form-check-label" for="restart">
              Mängu läbikukkumine, punktid, ja kordamine
            </label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="checkbox" value="animations"
            id="animations" v-model="person.basicFunc" @change="updateBasic">
            <label class="form-check-label" for="animations">
              Kasutaja tähelepanu juhitakse animatsioonidega
            </label>
          </div>
          <div class="btn-group-toggle btn-group btn-block mt-3" data-toggle="buttons" v-if="this.person.giveHalfBasic || this.person.overrideBasicFunc || this.person.basicFunc.length >= 4 && this.person.basicFunc.length < 6">
            <label class="btn btn-outline-success col-sm-12" v-bind:class="{ active: person.giveHalfBasic, 'disabled': person.overrideBasicFunc }">
              <input type="checkbox" autocomplete="off" v-model="person.giveHalfBasic" @change="updateBasic" :disabled="person.overrideBasicFunc"> Pooled punktid
            </label>
            <label class="btn btn-outline-success col-sm-12" v-bind:class="{ active: person.overrideBasicFunc, 'disabled': person.giveHalfBasic }">
              <input type="checkbox" autocomplete="off" v-model="person.overrideBasicFunc" @change="updateBasic" :disabled="person.giveHalfBasic"> Kõik punktid
            </label>
          </div>
        </div>
      </div>
      <div class="form-group card">
        <div class="card-header">
          Lisapunktid
        </div>
        <div class="card-body">
          <div class="form-check">
            <input class="form-check-input" type="checkbox" value="beauty"
            id="beauty" v-model="person.extras" @change="updateExtra">
            <label class="form-check-label" for="beauty">
              Ilus kujundus
            </label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="checkbox" value="design"
            id="design" v-model="person.extras" @change="updateExtra">
            <label class="form-check-label" for="design">
              Mängu kujundus toetab teemat
            </label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="checkbox" value="goodAnimations"
            id="goodAnimations" v-model="person.extras" @change="updateExtra">
            <label class="form-check-label" for="goodAnimations">
              Head ilmumised
            </label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="checkbox" value="sortingFeedBack"
            id="sortingFeedBack" v-model="person.extras" @change="updateExtra">
            <label class="form-check-label" for="sortingFeedBack">
              Hea sortimise tagasiside
            </label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="checkbox" value="episode"
            id="episode" v-model="person.extras" @change="updateExtra">
            <label class="form-check-label" for="episode">
              Hea lisaülesande "episood"
            </label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="checkbox" value="failureFeedback"
            id="failureFeedback" v-model="person.extras" @change="updateExtra">
            <label class="form-check-label" for="failureFeedback">
              Hea läbikukkumiste tagasiside
            </label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="checkbox" value="audibleFeedBack"
            id="audibleFeedBack" v-model="person.extras" @change="updateExtra">
            <label class="form-check-label" for="audibleFeedBack">
              Heliline tagasiside
            </label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="checkbox" value="learnaBility"
            id="learnaBility" v-model="person.extras" @change="updateExtra">
            <label class="form-check-label" for="learnaBility">
              Mängu õpitavus on hea
            </label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="checkbox" value="dragAndDrop"
            id="dragAndDrop" v-model="person.extras" @change="updateExtra">
            <label class="form-check-label" for="dragAndDrop">
              Sorditavaid objekte saab lohistada (drag&drop)
            </label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="checkbox" value="mobileSupport"
            id="mobileSupport" v-model="person.extras" @change="updateExtra">
            <label class="form-check-label" for="mobileSupport">
              Töötab ka mobiilil
            </label>
          </div>
          <h5 class="card-title mt-3">Ekstra (+/-) punktid</h5>
          <div class="form-row">
            <div class="form-group col-md-2">
              <label for="extraextrapoints">Punktid</label>
              <input type="number" class="form-control" id="extraextreapoints" placeholder="Punktid" v-model.number="person.extraExtraPoints" v-on:keyup.stop="updateExtra()" @change="updateExtra">
            </div>
            <div class="form-group col-md-6">
              <label for="reasonextraextra">Põhjus</label>
              <textarea class="form-control" id="reasonextraextra" v-model="person.extraExtraReason" rows="3" v-on:keyup.stop="updatePerson()"></textarea>
            </div>
          </div>
        </div>
      </div>
      <div class="form-group card">
        <div class="card-header">
          Negatiivne
        </div>
        <div class="card-body">
          <h5 class="card-title">Hilinemine</h5>
          <div class="btn-group-toggle btn-group btn-block" data-toggle="buttons">
            <label class="btn btn-outline-danger col-sm-12" v-bind:class="{ active: person.lateOneWeek, 'disabled': person.lateTwoWeeks }">
              <input type="checkbox" autocomplete="off" v-model="person.lateOneWeek" @change="updateNegative" :disabled="person.lateTwoWeeks"> Üks nädal
            </label>
            <label class="btn btn-outline-danger col-sm-12" v-bind:class="{ active: person.lateTwoWeeks, 'disabled': person.lateOneWeek }">
              <input type="checkbox" autocomplete="off" v-model="person.lateTwoWeeks" @change="updateNegative" :disabled="person.lateOneWeek"> Rohkem kui üks nädal
            </label>
          </div>
          <h5 class="card-title mt-3">Plagiaat</h5>
          <div class="input-group">
            <div class="input-group-prepend">
              <button class="btn btn-outline-danger" type="button" @click="person.plagiarism = !person.plagiarism; updatePerson()" v-bind:class="{ active: person.plagiarism}">Plagiaat</button>
            </div>
            <textarea class="form-control" aria-label="With textarea" v-model="person.plagiarismReason"></textarea>
          </div>
        </div>
      </div>
    </form>
    <h1 v-else>Vali kasutaja</h1>
  `,
  data() {
    return {
      person: this.selectedPerson
    };
  },
  computed: {
    selectedPersonId () {
      return this.$store.state.selectedPersonId;
    }
  },
  methods: {
    updatePerson: function () {
      store.commit('updatePerson', this.person);
    },
    updateTotal() {
      this.person.currentTotal = 0;
      if (this.person.basicPoints) {
        this.person.currentTotal += this.person.basicPoints;
      }
      if (this.person.extraPoints) {
        this.person.currentTotal += this.person.extraPoints;
      }
      if (this.person.penaltyPoints) {
        this.person.currentTotal += this.person.penaltyPoints;
      }
      if (this.person.extraExtraPoints) {
        this.person.currentTotal += this.person.extraExtraPoints;
      }
      this.updatePerson();
    },
    updateBasic() {
      this.updateTotal();
      if (this.person.overrideBasicFunc) {
        this.person.basicPoints = 10;
      } else if (this.person.giveHalfBasic) {
        this.person.basicPoints = 5;
      } else {
        this.person.basicPoints = Math.round(this.person.basicFunc.length * 1.66666666667);
      }
      this.updateTotal();
    },
    updateExtra() {
      this.updateTotal();
      this.person.extraPoints = this.person.extras.length;
      this.updateTotal();
    },
    updateNegative() {
      this.updateTotal();
      this.person.penaltyPoints = 0;
      if (this.person.lateOneWeek) {
        this.person.penaltyPoints += -2;
      }
      if (this.person.lateTwoWeeks) {
        this.person.penaltyPoints += -5;
      }
      this.updateTotal();
    }
  }
}

const app = new Vue({
  el: '#app',
  store: store,
  components: {
    add, search, items, editview
  },
  computed: {
    selectedPerson() {
      return this.$store.getters.getSelectedPerson;
    }
  }
});
