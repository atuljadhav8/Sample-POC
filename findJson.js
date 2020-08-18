
let f = {
    "orderDeliverylocationDetails": [
        {
            "orderDeliveryOptionCode": "C01",
            "orderDeliveryOptionValue": null,
            "orderDeliveryLocationType": "Delivery location(company)",
            "orderDeliveryLocationTypeValue": "31466"
        },
        {
            "orderDeliveryOptionCode": "C01",
            "orderDeliveryOptionValue": null,
            "orderDeliveryLocationType": "Delivery location(Travelex)",
            "orderDeliveryLocationTypeValue": null
        }
    ]
}

let d= f.orderDeliverylocationDetails.find(gg =>gg.orderDeliveryLocationType='Delivery location(company)');
console.log(d);