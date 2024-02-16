import { StyleSheet, Text, View, SafeAreaView, Platform, StatusBar, FlatList, TextInput, Pressable } from 'react-native';
import SegmentedControl from '@react-native-segmented-control/segmented-control';
import { useState } from 'react';
import { FontAwesome5 } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';


export default function App() {
  const [pressCalResult, setPressCalResult] = useState("")
  const [selectedSegmentValue, setSelectedSegmentValue] = useState("")
  const [selectedSegmentIndex, setSelectedSegmentIndex] = useState(0)
  const [pricePerLitre, setpricePerLitre] = useState("")
  const [gasMileage, setgasMileage] = useState("")
  const [utilityCost, setutilityCost] = useState("")
  const [evMileage, setevMileage] = useState("")
  const [midPressResult, setmidPressResult] = useState("")
  const [rightPressResult, setrightPressResult] = useState("")

  firstBtnPressed = () => {
    setmidPressResult((parseFloat(evMileage) * parseFloat(pricePerLitre) / parseFloat(utilityCost)).toFixed(1)) 
    setrightPressResult(((parseFloat(evMileage) * parseFloat(pricePerLitre) / parseFloat(utilityCost)) - parseFloat(gasMileage)).toFixed(1))
    setPressCalResult(((parseFloat(selectedSegmentValue)*parseFloat(pricePerLitre)/parseFloat(gasMileage))
    -(parseFloat(utilityCost)*parseFloat(selectedSegmentValue)/parseFloat(evMileage)).toFixed(2)))
  }

  return (
    <SafeAreaView style={{ flex: 12, backgroundColor: "#f5f5f5" }}>
      <View style={[styles.container, { flex: 12 }]}>

        <View style={{ flex: 1 }}>
          <Text style={styles.headingText}>EV Savings Calculator</Text>
        </View>

        <View style={{ flex: 0.5 }}>
          <Text style={styles.text}>Gas Vehicle Information:</Text>
        </View>

        <View style={{ flex: 1 }}>
          <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
            <TextInput
              style={styles.individualBoxContainer}
              placeholder="Price Per Litre ($/L)"
              value={pricePerLitre}
              onChangeText={setpricePerLitre}
            />
            <TextInput
              style={styles.individualBoxContainer}
              placeholder="Gas Mileage (km/L)"
              value={gasMileage}
              onChangeText={setgasMileage}
            />
          </View>
        </View>

        <View style={{ flex: 0.5 }}>
          <Text style={styles.text}>Electric Vehicle Information:</Text>
        </View>

        <View style={{ flex: 1 }}>
          <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
            <TextInput
              style={styles.individualBoxContainer}
              placeholder="Utility cost ($/kwH)"
              value={utilityCost}
              onChangeText={setutilityCost}
            />
            <TextInput
              style={styles.individualBoxContainer}
              placeholder="EV mileage (km/kwH)"
              value={evMileage}
              onChangeText={setevMileage}
            />
          </View>
        </View>

        <View style={{ flex: 1, paddingBottom: 20 }}>
          <Text style={styles.text}>How many km you drive each year:</Text>
          <SegmentedControl
            values={["15000", "25000", "40000"]}
            selectedIndex={selectedSegmentIndex}
            onChange={(event) => {
              // state variable setter for the index
              setSelectedSegmentIndex(event.nativeEvent.selectedSegmentIndex);
            }}
            onValueChange={setSelectedSegmentValue}
          />
        </View>

        <View style={{ flex: 1 }}>
          <Pressable style={[styles.insidePressable, { borderRadius: 5, backgroundColor: "#008080" }]} onPress={firstBtnPressed}>
            <Text style={styles.estimateSavings}>Estimate Savings</Text>
          </Pressable>
        </View>

        <View style={{ flex: 1 }}>
          <Text style={styles.forPrice}>For Price of 1 liter of gas, you can travel:</Text>
        </View>

        <View style={{ flex: 2, flexDirection: "row", justifyContent: 'space-between' }}>
          <Pressable style={styles.threePressable1}>
              <View style={{alignItems: "center", justifyContent:"center", gap:-12}}>
                <FontAwesome5 name="gas-pump" size={21} color="black" />
                <Text style={styles.settingMileage}>
                  {(parseFloat(gasMileage).toFixed(1))? (parseFloat(gasMileage).toFixed(1)): NaN}
                </Text>
                <Text style={[styles.text, { fontSize: 12 }]}>km</Text>
              </View>
          </Pressable>
        
          <Pressable style={styles.threePressable2}>
            <View style={{alignItems: "center", justifyContent:"center", gap:-12}}>
              <FontAwesome5 name="plug" size={21} color="black" />
              <Text style={styles.settingMileage}>
                {midPressResult ? midPressResult: NaN} 
              </Text>
              <Text style={[styles.text, { fontSize: 12 }]}>Km</Text>
            </View>
          </Pressable>
        
          <Pressable style={styles.threePressable3}>
            <View style={{alignItems: "center", justifyContent:"center", gap:-12}}>
            <Feather name="arrow-right-circle" size={21} color="black" />
            <Text style={styles.settingMileage}>
              {rightPressResult ? rightPressResult : NaN} 
            </Text>
            <Text style={[styles.text, { fontSize: 12 }]}>Km more</Text>
            </View>
          </Pressable>
        </View>

        <View style={{ flex: 1 }}>
          <Text style={styles.switchElectricText}>By swithing to electric, you obtain:</Text>
        </View>

        <View style={{ flex: 2 }}>
          <Pressable style={styles.lastPressable}>
            <Text style={styles.textCalulate}>
              {parseFloat(pressCalResult).toFixed(1)? parseFloat(pressCalResult).toFixed(1): NaN}</Text>
            <Text style={styles.inSavings}>in Savings per year</Text>
          </Pressable>
        </View>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    paddingHorizontal: 10,
    color: "#ffffff",
  },
  headingText: {
    fontSize: 30,
    textAlign: "center",
    color: "#828282",
    padding: 10
  },
  text: {
    fontSize: 15,
    color: "#828282",
    paddingBottom: 5
  },
  insidePressable: {
    borderWidth: 2,
    borderColor: "#828282",
  },
  individualBoxContainer: {
    borderWidth: 1,
    borderColor: "#777",
    width: "47%",
    height: 50,
    gap: 2,
    borderRadius: 5,
    backgroundColor: "#e8e8e8",
    borderColor: "#b2d8d8"
  },
  threePressable1: {
    borderWidth: 1,
    borderColor: "#aaa",
    padding: 5,
    fontSize: 10,
    borderRadius: 5,
    width: "30%",
    backgroundColor: "#add8e6"
  },
  threePressable2: {
    borderWidth: 1,
    borderColor: "#aaa",
    padding: 5,
    fontSize: 10,
    borderRadius: 5,
    width: "30%",
    backgroundColor: "#90ee90"
  },
  threePressable3: {
    borderWidth: 1,
    borderColor: "#aaa",
    padding: 5,
    fontSize: 10,
    borderRadius: 5,
    width: "30%",
    backgroundColor: "#ffb6c1"
  },
  switchElectricText: {
    fontSize: 18,
    textAlign: "center",
    padding: 15,
    color: "#828282",
    paddingBottom: 5
  },
  textCalulate: {
    textAlign: 'center',
    fontSize: 30
  },
  inSavings: {
    textAlign: 'center'
  },
  lastPressable: {
    borderWidth: 2,
    borderColor: "#828282",
    borderRadius: 5,
    backgroundColor: "#008080"
  },
  forPrice: {
    fontSize: 18,
    paddingTop: 18,
    fontSize: 15,
    color: "#828282",
    paddingBottom: 5
  },
  estimateSavings: {
    fontSize: 20,
    textAlign: "center",
    paddingTop: 15,
    height: 60
  },
  settingMileage: {
    textAlign: "center",
    fontSize: 20,
    padding: 20
  }
});
