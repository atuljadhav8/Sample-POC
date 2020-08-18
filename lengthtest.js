const objectMapper = require('object-mapper');
const fs = require('fs');
let data = fs.readFileSync("test.json");
let orderData = JSON.parse(data);
console.log(orderData.orderDetails[0].orderLineItemDetails.orderLineCurrencyDetails);
let a = {
    "name": "Atul",
    "age": 30
}
let transformedData = getFinalOrder(orderData);

fs.writeFileSync("append.json", JSON.stringify(transformedData), "UTF-8");
//console.log(transformedData);
function getFinalOrder(orderData) {
    try {
        let fileHeader = objectMapper(orderData, getFileHeader(orderData));
        let orderHeader = objectMapper(orderData, getOrderHeader(orderData));
        let order = {
            'fileHeader': fileHeader,
            'orderHeader': orderHeader
        }
        return order;

    }
    catch (exception) {
        console.log(exception);
    }

}

function getFileHeader(orderData) {
    try {
        let map = {
            'RecordType': {
                key: 'RecordType?',
                transform: () => {
                    return '000';
                }
            },
            'CorporateID': {
                key: 'CorporateID?',
                transform: () => {
                    return orderData.partyDetails[0].partyKeySource;
                }
            },
            'Filetype': {
                key: 'Filetype?',
                transform: () => {
                    return orderData.documentDetails.documentHeader.documentType;
                }
            },
            'GatewayID': {
                key: 'GatewayID?',
                transform: () => {
                    return orderData.documentDetails.documentHeader.gatewayId;
                }
            },
            'Gatewaycontrolsequencenumber': {
                key: 'Gatewaycontrolsequencenumber?',
                transform: () => {
                    return 1;
                }
            },
            'Bookcurrency': {
                key: 'Bookcurrency?',
                transform: () => {
                    return orderData.documentDetails.documentHeader.bookCurrency;
                }
            },
            'Datefilecreated': {
                key: 'Datefilecreated?',
                transform: () => {
                    return orderData.documentDetails.documentHeader.datetimeDocCreated.substr(0, 9);
                }
            },
            'Timefilecreated': {
                key: 'Timefilecreated?',
                transform: () => {
                    return orderData.documentDetails.documentHeader.datetimeDocCreated.substr(9);
                }
            },
            'Endofrecordmarker': {
                key: 'Endofrecordmarker?',
                transform: () => {
                    return '#';
                }
            }
        }
        return map;
    } catch (exception) {
        console.log(exception);
    }
}

function getOrderHeader(orderData) {
    try {
        let map = {
            'Recordtype': {
                key: 'Recordtype?',
                transform: () => {
                    return '001';
                }
            },
            'CustomerID': {
                key: 'CustomerID?',
                transform: () => {
                    return orderData.partyDetails[0].partyId;
                }
            },
            'Recordsequencenumber': {
                key: 'Recordsequencenumber?',
                transform: () => {
                    return 1;
                }
            },
            'CustomerOrderreference': {
                key: 'CustomerOrderreference?',
                transform: () => {
                    return orderData.orderDetails[0].orderTrackNum;
                }
            },
            'Version': {
                key: 'Version?',
                transform: () => {
                    return orderData.orderDetails[0].orderVersion;
                }
            },
            'Ordertype': {
                key: 'Ordertype?',
                transform: () => {
                    return orderData.orderDetails[0].orderTypeCode
                }
            },
            'Orderstatus': {
                key: 'Orderstatus?',
                transform: () => {
                    return orderData.orderDetails[0].orderStatusDetails.orderStatusCode;
                }
            },
            'Billingmethod': {
                key: 'Billingmethod?',
                transform: () => {
                    return orderData.orderDetails[0].orderSettlement[0].settlementModeAttributes[0].settlementMode;
                }
            },
            'Billingcurrency': {
                key: 'Billingcurrency?',
                transform: () => {
                    return orderData.orderDetails[0].orderLineItemDetails.orderLineDomesticCurrencyCode;
                }
            },
            'Paymentmethod': {
                key: 'Paymentmethod?',
                transform: () => {
                    return orderData.orderDetails[0].orderPayementDetails.orderPaymentTypeId;
                }
            },
            'Paymentstatus': {
                key: 'Paymentstatus?',
                transform: () => {
                    return orderData.orderDetails[0].orderPayementDetails.orderPaymentStatusCode;
                }
            },
            'Customertype': {
                key: 'Customertype?',
                transform: () => {
                    return orderData.partyDetails[0].partyRoleCode
                }
            },
            'Orderlocation': {
                key: 'Orderlocation?',
                transform: () => {
                    return orderData.orderDetails[0].OrderlocationDetails;
                }
            },
            'Username': {
                key: 'Username?',
                transform: () => {
                    return orderData.sourceExtended.userId;
                }
            },
            'Dateorderplaced': {
                key: 'Dateorderplaced?',
                transform: () => {
                    return orderData.orderDetails[0].orderCreationDate.substr(0, 9);
                }
            },
            'Timeorderplaced': {
                key: 'Timeorderplaced?',
                transform: () => {
                    return orderData.orderDetails[0].orderCreationDate.substr(9);
                }
            },
            'Originalorderreference': {
                key: 'Originalorderreference?',
                transform: () => {
                    return orderData.orderDetails[0].orderExternalReferenceCode;
                }
            },
            'TCSorderreference': {
                key: 'TCSorderreference?',
                transform: () => {
                    return orderData.orderDetails[0].orderReferenceCode;
                }
            },
            'Formreference': {
                key: 'Formreference?',
                transform: () => {
                    return orderData.orderDetails[0].orderFormReference;
                }
            },
            'Faultallocation': {
                key: 'Faultallocation?',
                transform: () => {
                    return orderData.orderDetails[0].orderFaultAllocationCode;
                }
            },
            'Authorisationreference': {
                key: 'Authorisationreference?',
                transform: () => {
                    return orderData.orderDetails[0].orderAuthorizationRefCode;
                }
            },
            'Requiredbydate': {
                key: 'Requiredbydate?',
                transform: () => {
                    return orderData.orderDetails[0].orderFullfilmentDetails[0].orderFulfillmentDate.substr(0, 9);
                }
            },
            'Requiredbytime': {
                key: 'Requiredbytime?',
                transform: () => {
                    return orderData.orderDetails[0].orderFullfilmentDetails[0].orderFulfillmentDate.substr(9);
                }
            },
            'Deliveryoption': {
                key: 'Deliveryoption?',
                transform: () => {
                    return orderData.orderDetails[0].orderDeliverylocationDetails.orderDeliveryOptionCode;
                }
            },
            'DeliverylocationCompany': {
                key: 'DeliverylocationCompany?',
                transform: () => {
                    let deliveryLoc = orderData.orderDetails[0].orderDeliverylocationDetails.find(location => location.orderDeliveryLocationType = 'Delivery location(company)');
                    return deliveryLoc.orderDeliveryLocationTypeValue;
                }
            },
            'DeliverylocationTravelex': {
                key: 'DeliverylocationTravelex?',
                transform: () => {
                    let deliveryLoc = orderData.orderDetails[0].orderDeliverylocationDetails.find(location => location.orderDeliveryLocationType = 'Delivery location(Travelex)');
                    return deliveryLoc.orderDeliveryLocationTypeValue;
                }
            },
            'Deliverycharge': {
                key: 'Deliverycharge?',
                transform: () => {
                    let deliveryCharge = orderData.orderDetails[0].orderPricing[0].charge[0].chargeDetails.find(charge => charge.chargeType = 'Delivery charge');
                    return deliveryCharge.chargeAmt;
                }
            },
            'Commission': {
                key: 'Commission?',
                transform: () => {
                    return orderData.orderDetails[0].orderPricing[0].commission[0].commDetails[0].commAmt;
                }
            },
            'Surname': {
                key: 'Surname?',
                transform: () => {
                    return orderData.partyDetails[0].partyRolePersonDetails.personFamilyName;
                }
            },
            'Initials': {
                key: 'Initials?',
                transform: () => {
                    return orderData.partyDetails[0].partyRolePersonDetails.personTitleCode;
                }
            },
            'Title': {
                key: 'Title?',
                transform: () => {
                    return orderData.partyDetails[0].partyRolePersonDetails.personTitleDescription;
                }
            },
            'Source': {
                key: 'Source?',
                transform: () => {
                    return orderData.sourceBasic.sourceSystem;
                }
            },
            'Rewardpointeligibility': {
                key: 'Rewardpointeligibility?',
                transform: () => {
                    return orderData.orderDetails[0].OrderMarketingDetails.ifOrderEligibleForRewardPoints;
                }
            },
            'MessageID': {
                key: 'MessageID?',
                transform: () => {
                    return orderData.orderDetails[0].OrderMarketingDetails.orderMessagedetails;
                }
            },
            'CardHandlingFee': {
                key: 'CardHandlingFee?',
                transform: () => {
                    let fee = orderData.orderDetails[0].orderPricing[0].fee[0].feeDetails.find(fee => fee.feeType = 'Card Handling Fee');
                    return fee.feeAmt;
                }
            },
            'Endofrecordmarker': {
                key: 'Endofrecordmarker?',
                transform: () => {
                    return '#';
                }
            },

        }
        return map;
    } catch (exception) {
        console.log(exception);
    }
}

function mapToCnrDomainAttributes(a) {
    try {
        let map = {
            'ID': {
                key: 'ID?',
                transform: () => {
                    return '1234';
                }
            },
            'Name': {
                key: 'Name?',
                transform: () => {
                    return a.name;
                }
            },
            'Age': {
                key: 'Age?',
                transform: () => {
                    return a.age + 2;
                }
            }
        }
        return map;
    } catch (exception) {
        console.log(exception);
    }
}