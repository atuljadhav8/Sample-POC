const objectMapper = require('object-mapper');
const fs = require('fs');
let data = fs.readFileSync("test.json");
let orderData = JSON.parse(data);

let transformedData = getFinalOrder(orderData);
fs.writeFileSync("append.json", JSON.stringify(transformedData), "UTF-8");
//console.log(transformedData);
function getFinalOrder(orderData) {
    try {
        let fileHeader = objectMapper(orderData, getFileHeader(orderData));
        let orderHeader = objectMapper(orderData, getOrderHeader(orderData));
        let customerAddress = objectMapper(orderData, getCustomerAddress(orderData));
        let customInfo = getCustomInfoArray(orderData);
        let lineItemsArray = getLineItemsArray(orderData);
        let orderTrailer = objectMapper(orderData, getOrderTrailer(orderData));
        let fileTrailer = objectMapper(orderData, getFileTrailer(orderData));
        let order = {
            'fileHeader': fileHeader,
            'order': {
                'orderHeader': orderHeader,
                'customerAddress': customerAddress,
                'customInfo': customInfo,
                'lineItems': lineItemsArray,
                'orderTrailer': orderTrailer
            },
            'fileTrailer': fileTrailer
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
            'recordType': {
                key: 'recordType?',
                transform: () => {
                    return '000';
                }
            },
            'corporateId': {
                key: 'corporateId?',
                transform: () => {
                    return orderData.partyDetails[0].partyKeySource;
                }
            },
            'fileType': {
                key: 'fileType?',
                transform: () => {
                    return orderData.documentDetails.documentHeader.documentType;
                }
            },
            'gatewayId': {
                key: 'gatewayId?',
                transform: () => {
                    return orderData.documentDetails.documentHeader.gatewayId;
                }
            },
            'gatewayControlSequenceNumber': {
                key: 'gatewayControlSequenceNumber?',
                transform: () => {
                    return 'updateInAdapter';
                }
            },
            'bookCurrency': {
                key: 'bookCurrency?',
                transform: () => {
                    return orderData.documentDetails.documentHeader.bookCurrency;
                }
            },
            'dateFileCreated': {
                key: 'dateFileCreated?',
                transform: () => {
                    return orderData.documentDetails.documentHeader.datetimeDocCreated.substr(0, 9);
                }
            },
            'timeFileCreated': {
                key: 'timeFileCreated?',
                transform: () => {
                    return orderData.documentDetails.documentHeader.datetimeDocCreated.substr(9);
                }
            },
            'endOfRecordMarker': {
                key: 'endOfRecordMarker?',
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
            'recordType': {
                key: 'recordType?',
                transform: () => {
                    return '001';
                }
            },
            'customerId': {
                key: 'customerId?',
                transform: () => {
                    return orderData.partyDetails[0].partyId;
                }
            },
            'recordSequenceNumber': {
                key: 'recordSequenceNumber?',
                transform: () => {
                    return 'updateInAdapter';
                }
            },
            'customerOrderReference': {
                key: 'customerOrderReference?',
                transform: () => {
                    return orderData.orderDetails[0].orderTrackNum;
                }
            },
            'version': {
                key: 'version?',
                transform: () => {
                    return orderData.orderDetails[0].orderVersion;
                }
            },
            'orderType': {
                key: 'orderType?',
                transform: () => {
                    return orderData.orderDetails[0].orderTypeCode
                }
            },
            'orderStatus': {
                key: 'orderStatus?',
                transform: () => {
                    return orderData.orderDetails[0].orderStatusDetails[0].orderStatusCode;
                }
            },
            'billingMethod': {
                key: 'billingMethod?',
                transform: () => {
                    return orderData.orderDetails[0].orderSettlement[0].settlementModeAttributes[0].settlementMode;
                }
            },
            'billingCurrency': {
                key: 'billingCurrency?',
                transform: () => {
                    return orderData.orderDetails[0].orderLineItemDetails[0].orderLineDomesticCurrencyCode;
                }
            },
            'paymentMethod': {
                key: 'paymentMethod?',
                transform: () => {
                    return orderData.orderDetails[0].orderPayementDetails[0].orderPaymentTypeId;
                }
            },
            'paymentStatus': {
                key: 'paymentStatus?',
                transform: () => {
                    return orderData.orderDetails[0].orderPayementDetails[0].orderPaymentStatusCode;
                }
            },
            'customerType': {
                key: 'customerType?',
                transform: () => {
                    return orderData.partyDetails[0].partyRoleCode
                }
            },
            'orderLocation': {
                key: 'orderLocation?',
                transform: () => {
                    return orderData.orderDetails[0].orderDeliverylocationDetails[0].orderDeliveryOptionCode;
                }
            },
            'userName': {
                key: 'userName?',
                transform: () => {
                    return orderData.sourceExtended.userId;
                }
            },
            'dateOrderPlaced': {
                key: 'dateOrderPlaced?',
                transform: () => {
                    return orderData.orderDetails[0].orderCreationDate.substr(0, 9);
                }
            },
            'timeOrderPlaced': {
                key: 'timeOrderPlaced?',
                transform: () => {
                    return orderData.orderDetails[0].orderCreationDate.substr(9);
                }
            },
            'originalOrderReference': {
                key: 'originalOrderReference?',
                transform: () => {
                    return orderData.orderDetails[0].orderExternalReferenceCode;
                }
            },
            'TCSOrderReference': {
                key: 'TCSOrderReference?',
                transform: () => {
                    return orderData.orderDetails[0].orderReferenceCode;
                }
            },
            'formReference': {
                key: 'formReference?',
                transform: () => {
                    return orderData.orderDetails[0].orderFormReference;
                }
            },
            'faultAllocation': {
                key: 'faultAllocation?',
                transform: () => {
                    return orderData.orderDetails[0].orderFaultAllocationCode;
                }
            },
            'authorisationReference': {
                key: 'authorisationReference?',
                transform: () => {
                    return orderData.orderDetails[0].orderAuthorizationRefCode;
                }
            },
            'requiredByDate': {
                key: 'requiredByDate?',
                transform: () => {
                    return orderData.orderDetails[0].orderFullfilmentDetails[0].orderFulfillmentDate.substr(0, 9);
                }
            },
            'requiredByTime': {
                key: 'requiredByTime?',
                transform: () => {
                    return orderData.orderDetails[0].orderFullfilmentDetails[0].orderFulfillmentDate.substr(9);
                }
            },
            'deliveryOption': {
                key: 'deliveryOption?',
                transform: () => {
                    return orderData.orderDetails[0].orderDeliverylocationDetails[0].orderDeliveryOptionCode;
                }
            },
            'deliveryLocationCompany': {
                key: 'deliveryLocationCompany?',
                transform: () => {
                    let deliveryLoc = orderData.orderDetails[0].orderDeliverylocationDetails.find(location => location.orderDeliveryLocationType = 'Delivery location(company)');
                    return deliveryLoc.orderDeliveryLocationTypeValue;
                }
            },
            'deliveryLocationTravelex': {
                key: 'deliveryLocationTravelex?',
                transform: () => {
                    let deliveryLoc = orderData.orderDetails[0].orderDeliverylocationDetails.find(location => location.orderDeliveryLocationType = 'Delivery location(Travelex)');
                    return deliveryLoc.orderDeliveryLocationTypeValue;
                }
            },
            'deliveryCharge': {
                key: 'deliveryCharge?',
                transform: () => {
                    let deliveryCharge = orderData.orderDetails[0].orderPricing[0].charge[0].chargeDetails.find(charge => charge.chargeType = 'Delivery charge');
                    return deliveryCharge.chargeAmt;
                }
            },
            'commission': {
                key: 'commission?',
                transform: () => {
                    return orderData.orderDetails[0].orderPricing[0].commission[0].commDetails[0].commAmt;
                }
            },
            'surname': {
                key: 'surname?',
                transform: () => {
                    return orderData.partyDetails[0].partyRolePersonDetails[0].personFamilyName;
                }
            },
            'initials': {
                key: 'initials?',
                transform: () => {
                    return orderData.partyDetails[0].partyRolePersonDetails[0].personTitleCode;
                }
            },
            'title': {
                key: 'title?',
                transform: () => {
                    return orderData.partyDetails[0].partyRolePersonDetails[0].personTitleDescription;
                }
            },
            'source': {
                key: 'source?',
                transform: () => {
                    return orderData.sourceBasic.sourceSystem;
                }
            },
            'rewardPointEligibility': {
                key: 'rewardPointEligibility?',
                transform: () => {
                    return orderData.orderDetails[0].OrderMarketingDetails[0].ifOrderEligibleForRewardPoints;
                }
            },
            'messageId': {
                key: 'messageId?',
                transform: () => {
                    return orderData.orderDetails[0].OrderMarketingDetails[0].orderMessagedetails;
                }
            },
            'cardHandlingFee': {
                key: 'cardHandlingFee?',
                transform: () => {
                    let fee = orderData.orderDetails[0].orderPricing[0].fee[0].feeDetails.find(fee => fee.feeType = 'Card Handling Fee');
                    return fee.feeAmt;
                }
            },
            'endOfRecordMarker': {
                key: 'endOfRecordMarker?',
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

function getCustomerAddress(orderData) {
    try {
        let map = {
            'recordType': {
                key: 'recordType?',
                transform: () => {
                    return '002';
                }
            },
            'customerId': {
                key: 'customerId?',
                transform: () => {
                    return orderData.partyDetails[0].partyId;
                }
            },
            'recordSequenceNumber': {
                key: 'recordSequenceNumber?',
                transform: () => {
                    return 'updateInAdapter';
                }
            },
            'customerOrderReference': {
                key: 'customerOrderReference?',
                transform: () => {
                    return orderData.orderDetails[0].orderTrackNum;
                }
            },
            'version': {
                key: 'version?',
                transform: () => {
                    return orderData.orderDetails[0].orderVersion;
                }
            },
            'addressType': {
                key: 'addressType?',
                transform: () => {
                    return orderData.partyDetails[0].partyContactDetails[0].partyAddressTypeIdDescription;
                }
            },
            'telephoneNumber': {
                key: 'telephoneNumber?',
                transform: () => {
                    return orderData.partyDetails[0].partyContactDetails[0].electronicContactTypeDescription;
                }
            },
            'companyName': {
                key: 'companyName?',
                transform: () => {
                    return orderData.partyDetails[0].partyRoleOrganization[0].organisationNameFull;
                }
            },
            'departmentName': {
                key: 'departmentName?',
                transform: () => {
                    return orderData.partyDetails[0].partyRoleOrganization[0].organisationBusinessUnitName;
                }
            },
            'addressLine1': {
                key: 'addressLine1?',
                transform: () => {
                    return orderData.partyDetails[0].partyContactDetails[0].addressLine1;
                }
            },
            'addressLine2': {
                key: 'addressLine2?',
                transform: () => {
                    return orderData.partyDetails[0].partyContactDetails[0].addressLine2;
                }
            },
            'addressLine3': {
                key: 'addressLine3?',
                transform: () => {
                    return orderData.partyDetails[0].partyContactDetails[0].addressLine3;
                }
            },
            'city': {
                key: 'city?',
                transform: () => {
                    return orderData.partyDetails[0].partyContactDetails[0].city;
                }
            },
            'state': {
                key: 'state?',
                transform: () => {
                    return orderData.partyDetails[0].partyContactDetails[0].stateOrProvince;
                }
            },
            'postalCode': {
                key: 'postalCode?',
                transform: () => {
                    return orderData.partyDetails[0].partyContactDetails[0].postalOrZipCode;
                }
            },
            'country': {
                key: 'country?',
                transform: () => {
                    return orderData.partyDetails[0].partyContactDetails[0].countryCode;
                }
            },
            'endOfRecordMarker': {
                key: 'endOfRecordMarker?',
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

function getCustomInfoArray(orderData) {
    try {
        let map = [];
        let length = orderData.orderDetails[0].additionalFields.length;
        for (let count = 0; count < length; count++) {
            let customInfo = objectMapper(orderData, getCustomInfo(orderData, count));
            //console.log('**********#######',element);
            map.push(customInfo);
        }
        return map;
    } catch (exception) {
        console.log(exception);
    }
}

function getCustomInfo(orderData, count) {
    try {
        let map = {
            'recordType': {
                key: 'recordType?',
                transform: () => {
                    return '004';
                }
            },
            'customerId': {
                key: 'customerId?',
                transform: () => {
                    return orderData.partyDetails[0].partyId;
                }
            },
            'recordSequenceNumber': {
                key: 'recordSequenceNumber?',
                transform: () => {
                    return 'updateInAdapter';
                }
            },
            'customerOrderReference': {
                key: 'customerOrderReference?',
                transform: () => {
                    return orderData.orderDetails[0].orderTrackNum;
                }
            },
            'version': {
                key: 'version?',
                transform: () => {
                    return orderData.orderDetails[0].orderVersion;
                }
            },
            'keyword': {
                key: 'keyword?',
                transform: () => {
                    return orderData.orderDetails[0].additionalFields[count].fieldName;
                }
            },
            'keywordData': {
                key: 'keywordData?',
                transform: () => {
                    return orderData.orderDetails[0].additionalFields[count].fieldValue;
                }
            },
            'endOfRecordMarker': {
                key: 'endOfRecordMarker?',
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

function getLineItemsArray(orderData) {
    try {
        let map = [];
        let length = orderData.orderDetails[0].orderLineItemDetails.length;
        for (let count = 0; count < length; count++) {
            let lineItem = objectMapper(orderData, getLineItems(orderData, count));
            //console.log('**********#######',element);
            map.push(lineItem);
        }
        return map;
    } catch (exception) {
        console.log(exception);
    }
}

function getLineItems(orderData, count) {
    try {
        let denominations = getDenominationsArray(orderData, count);
        let beneficiary = objectMapper(orderData, getBeneficiary(orderData, count));
        let map = {
            'recordType': {
                key: 'recordType?',
                transform: () => {
                    return '006';
                }
            },
            'customerId': {
                key: 'customerId?',
                transform: () => {
                    return orderData.partyDetails[0].partyId;
                }
            },
            'recordSequenceNumber': {
                key: 'recordSequenceNumber?',
                transform: () => {
                    return 'updateInAdapter';
                }
            },
            'customerOrderReference': {
                key: 'customerOrderReference?',
                transform: () => {
                    return orderData.orderDetails[0].orderTrackNum;
                }
            },
            'version': {
                key: 'version?',
                transform: () => {
                    return orderData.orderDetails[0].orderVersion;
                }
            },
            'lineItem': {
                key: 'lineItem?',
                transform: () => {
                    return count + 1;
                }
            },
            'productType': {
                key: 'productType?',
                transform: () => {
                    return orderData.orderDetails[0].productDetails[0].productTyeDescription;
                }
            },
            'currency': {
                key: 'currency?',
                transform: () => {
                    return orderData.orderDetails[0].orderLineItemDetails[count].orderLineCurrencyDetails[0].currencyISOCode;
                }
            },
            'foreignValue': {
                key: 'foreignValue?',
                transform: () => {
                    return orderData.orderDetails[0].orderPricing[count].basic[0].foreignAmt;
                }
            },
            'exchangeRate': {
                key: 'exchangeRate?',
                transform: () => {
                    return orderData.orderDetails[0].orderPricing[count].rate[0].fxRate;
                }
            },
            'bookCurrencyValue': {
                key: 'bookCurrencyValue?',
                transform: () => {
                    return orderData.orderDetails[0].orderLineItemDetails[count].orderLineBookCurrencyValue;
                }
            },
            'denominationsType': {
                key: 'denominationsType?',
                transform: () => {
                    return orderData.orderDetails[0].orderLineItemDetails[count].orderLineCurrencyDetails[0].denominationSizeRequestId;
                }
            },
            'commissionAmount': {
                key: 'commissionAmount?',
                transform: () => {
                    return orderData.orderDetails[0].orderLineItemDetails[count].orderLineCommissionDetails[0].orderCommissionAmount;
                }
            },
            'issuer': {
                key: 'issuer?',
                transform: () => {
                    return orderData.partyDetails[0].partyRoleBranch[0].partyRoleBranchIdentityDetails[0].branchIdentifierIssuingGovernanceId;
                }
            },
            'endOfRecordMarker': {
                key: 'endOfRecordMarker?',
                transform: () => {
                    return '#';
                }
            },
            'denominations': {
                key: 'denominations?',
                transform: () => {
                    return denominations;
                }
            },
            'beneficiary': {
                key: 'beneficiary?',
                transform: () => {
                    return [beneficiary];
                }
            }
        }
        return map;
    } catch (exception) {
        console.log(exception);
    }
}

function getDenominationsArray(orderData, lineItemCount) {
    try {
        let map = [];
        let length = orderData.orderDetails[0].orderLineItemDetails[lineItemCount].orderLineCurrencyDetails.length;
        for (let denominationCount = 0; denominationCount < length; denominationCount++) {
            let denominations = objectMapper(orderData, getDenominations(orderData, lineItemCount, denominationCount));
            map.push(denominations);
        }
        return map;
    } catch (exception) {
        console.log(exception);
    }
}

function getDenominations(orderData, lineItemCount, denominationCount) {
    try {
        let map = {
            'recordType': {
                key: 'recordType?',
                transform: () => {
                    return '007';
                }
            },
            'customerId': {
                key: 'customerId?',
                transform: () => {
                    return orderData.partyDetails[0].partyId;
                }
            },
            'recordSequenceNumber': {
                key: 'recordSequenceNumber?',
                transform: () => {
                    return 'updateInAdapter';
                }
            },
            'customerOrderReference': {
                key: 'customerOrderReference?',
                transform: () => {
                    return orderData.orderDetails[0].orderTrackNum;
                }
            },
            'version': {
                key: 'version?',
                transform: () => {
                    return orderData.orderDetails[0].orderVersion;
                }
            },
            'lineItem': {
                key: 'lineItem?',
                transform: () => {
                    return lineItemCount + 1;
                }
            },
            'denominationValue': {
                key: 'denominationValue?',
                transform: () => {
                    return orderData.orderDetails[0].orderLineItemDetails[lineItemCount].orderLineCurrencyDetails[denominationCount].denominationValue;
                }
            },
            'quantity': {
                key: 'quantity?',
                transform: () => {
                    return orderData.orderDetails[0].orderLineItemDetails[lineItemCount].orderLineCurrencyDetails[denominationCount].denominationQuantity;
                }
            },
            'endOfRecordMarker': {
                key: 'endOfRecordMarker?',
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

function getBeneficiary(orderData, lineItemCount) {
    try {
        let map = {
            'recordType': {
                key: 'recordType?',
                transform: () => {
                    return '016';
                }
            },
            'customerId': {
                key: 'customerId?',
                transform: () => {
                    return orderData.partyDetails[lineItemCount].partyId;
                }
            },
            'recordSequenceNumber': {
                key: 'recordSequenceNumber?',
                transform: () => {
                    return 'updateInAdapter';
                }
            },
            'customerOrderReference': {
                key: 'customerOrderReference?',
                transform: () => {
                    return orderData.orderDetails[0].orderTrackNum;
                }
            },
            'version': {
                key: 'version?',
                transform: () => {
                    return orderData.orderDetails[0].orderVersion;
                }
            },
            'lineItem': {
                key: 'lineItem?',
                transform: () => {
                    return lineItemCount + 1;
                }
            },
            'name': {
                key: 'name?',
                transform: () => {
                    return orderData.partyDetails[lineItemCount].partyRolePersonDetails[0].personFullLegalName;
                }
            },
            'addressLine1': {
                key: 'addressLine1?',
                transform: () => {
                    return orderData.partyDetails[lineItemCount].partyContactDetails[0].addressLine1;
                }
            },
            'addressLine2': {
                key: 'addressLine2?',
                transform: () => {
                    return orderData.partyDetails[lineItemCount].partyContactDetails[0].addressLine2;
                }
            },
            'city': {
                key: 'city?',
                transform: () => {
                    return orderData.partyDetails[lineItemCount].partyContactDetails[0].city;
                }
            },
            'region': {
                key: 'region?',
                transform: () => {
                    return orderData.partyDetails[lineItemCount].partyContactDetails[0].stateOrProvince;
                }
            },
            'postalCode': {
                key: 'postalCode?',
                transform: () => {
                    return orderData.partyDetails[lineItemCount].partyContactDetails[0].postalOrZipCode;
                }
            },
            'country': {
                key: 'country?',
                transform: () => {
                    return orderData.partyDetails[lineItemCount].partyContactDetails[0].countryCode;
                }
            },
            'comments': {
                key: 'comments?',
                transform: () => {
                    return orderData.partyDetails[lineItemCount].partyRolePersonDetails[0].partyRolePersonKYCInformation[0].customerInformationPartnerComment;
                }
            },
            'draftNumber': {
                key: 'draftNumber?',
                transform: () => {
                    return orderData.orderDetails[0].orderReferenceCode;
                }
            },
            'endOfRecordMarker': {
                key: 'endOfRecordMarker?',
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

function getOrderTrailer(orderData) {
    try {
        let map = {
            'recordType': {
                key: 'recordType?',
                transform: () => {
                    return '099';
                }
            },
            'customerId': {
                key: 'customerId?',
                transform: () => {
                    return orderData.partyDetails[0].partyId;
                }
            },
            'recordSequenceNumber': {
                key: 'recordSequenceNumber?',
                transform: () => {
                    return 'updateInAdapter';
                }
            },
            'customerOrderReference': {
                key: 'customerOrderReference?',
                transform: () => {
                    return orderData.orderDetails[0].orderTrackNum;
                }
            },
            'version': {
                key: 'version?',
                transform: () => {
                    return orderData.orderDetails[0].orderVersion;
                }
            },
            'countOfLineItems': {
                key: 'countOfLineItems?',
                transform: () => {
                    return orderData.orderDetails[0].orderLineItemDetails.length;
                }
            },
            'totalBookCurrencyValue': {
                key: 'totalBookCurrencyValue?',
                transform: () => {
                    let totalBookCurrencyValue = 0;
                    let length = orderData.orderDetails[0].orderLineItemDetails.length;
                    for (let count = 0; count < length; count++)
                        totalBookCurrencyValue += Number(orderData.orderDetails[0].orderLineItemDetails[count].orderLineBookCurrencyValue);
                    return totalBookCurrencyValue;
                }
            },
            'totalCommissionValue': {
                key: 'totalCommissionValue?',
                transform: () => {
                    let totalCommissionValue = 0;
                    let length = orderData.orderDetails[0].orderLineItemDetails.length;
                    totalCommissionValue = Number(orderData.orderDetails[0].orderPricing[0].commission[0].commDetails[0].commAmt);
                    for (let count = 0; count < length; count++)
                        totalCommissionValue += Number(orderData.orderDetails[0].orderLineItemDetails[count].orderLineCommissionDetails[0].orderCommissionAmount);
                    return totalCommissionValue;
                }
            },
            'totalPromotionFees': {
                key: 'totalPromotionFees?',
                transform: () => {
                    return 0;
                }
            },
            'totalDeliveryFees': {
                key: 'totalDeliveryFees?',
                transform: () => {
                    let deliveryCharge = orderData.orderDetails[0].orderPricing[0].charge[0].chargeDetails.find(charge => charge.chargeType = 'Delivery charge');
                    return Number(deliveryCharge.chargeAmt);
                }
            },
            'orderRecordCount': {
                key: 'orderRecordCount?',
                transform: () => {
                    let orderRecordCount = 2; //Default count set to 2 for order header and trailer rows
                    if (orderData.partyDetails[0].partyContactDetails[0].partyAddressTypeIdDescription && orderData.partyDetails[0].partyContactDetails[0].partyAddressTypeIdDescription.trim() != '')
                        orderRecordCount += 1; //Adding count for customer address row
                    orderRecordCount += orderData.orderDetails[0].additionalFields.length //Adding count for custom info rows
                    let lineItemCount = orderData.orderDetails[0].orderLineItemDetails.length;
                    orderRecordCount += lineItemCount; //Adding count for Line Items
                    for (let count = 0; count < lineItemCount; count++) {
                        let denomCount = orderData.orderDetails[0].orderLineItemDetails[count].orderLineCurrencyDetails.length;
                        orderRecordCount += denomCount; //Adding count for Denominations in each line items
                        if (orderData.partyDetails[count].partyRolePersonDetails[0].personFullLegalName && orderData.partyDetails[count].partyRolePersonDetails[0].personFullLegalName.trim() != '')
                            orderRecordCount += 1; //Adding count for Beneficiary in each Line Item
                    }
                    return orderRecordCount;
                }
            },
            'checkSum': {
                key: 'checkSum?',
                transform: () => {
                    return null;
                }
            },
            'endOfRecordMarker': {
                key: 'endOfRecordMarker?',
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

function getFileTrailer(orderData) {
    try {
        let map = {
            'recordType': {
                key: 'recordType?',
                transform: () => {
                    return '999';
                }
            },
            'corporateId': {
                key: 'corporateId?',
                transform: () => {
                    return orderData.partyDetails[0].partyKeySource;
                }
            },
            'countOfLineItems': {
                key: 'countOfLineItems?',
                transform: () => {
                    return orderData.documentDetails.documentTrailer.documentRecordCount;
                }
            },
            'totalBookCurrencyValue': {
                key: 'totalBookCurrencyValue?',
                transform: () => {
                    return 'updateInAdapter';
                }
            },
            'totalCommissionValue': {
                key: 'totalCommissionValue?',
                transform: () => {
                    return 'updateInAdapter';
                }
            },
            'totalPromotionFees': {
                key: 'totalPromotionFees?',
                transform: () => {
                    return 'updateInAdapter';
                }
            },
            'totalDeliveryFees': {
                key: 'totalDeliveryFees?',
                transform: () => {
                    return 'updateInAdapter';
                }
            },
            'fileRecordCount': {
                key: 'fileRecordCount?',
                transform: () => {
                    return 'updateInAdapter';
                }
            },
            'checkSum': {
                key: 'checkSum?',
                transform: () => {
                    return null;
                }
            },
            'endOfRecordMarker': {
                key: 'endOfRecordMarker?',
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