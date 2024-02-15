<ScrollView showsVerticalScrollIndicator={false} style={globalStyles.container}>
  <View>
    {/* --------------- Profile pic section -------------------------------------------------------- */}
    <View style={style.accountSection}>
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity
          style={style.profileIcon}
          disabled={isVerified}
          onPress={() => bottomSheetHandle('PROFILE_PIC')}>
          <Avatar.Image
            source={
              user.profile_pic
                ? {
                    uri: user.profile_pic,
                  }
                : iconPath.AVATAR
            }
            size={70}
          />
        </TouchableOpacity>

        <View style={[globalStyles.ml_2, {width: '75%'}]}>
          <Headline style={[style.headline]}>
            {user?.user_name === 'Partner' || user?.user_name == ''
              ? 'Partner'
              : user?.user_name}
          </Headline>
          <Text style={globalStyles.mediumText}>
            {user.mobile_primary.toString()}
          </Text>
        </View>
      </View>
      <StatusIndicator status={user.status} styles={style.statusIndicator} />
      {/* Account Details if verified */}
      {isVerified ? (
        <View>
          <Collapse isExpanded={expanded}>
            <CollapseHeader>
              <TouchableOpacity onPress={() => setExpanded(!expanded)}>
                <Text style={style.detailsHeading}>CLICK HERE FOR DETAILS</Text>
              </TouchableOpacity>
            </CollapseHeader>

            <CollapseBody>
              <Text style={style.details}>Address: {user?.address}</Text>

              <Text style={style.details} numberOfLines={1}>
                PAN: {user?.documents.pan_number || 'NA'}
              </Text>

              <Text style={style.details} numberOfLines={1}>
                GST: {user?.documents.gst_number || 'NA'}
              </Text>

              <Text style={style.details} numberOfLines={1}>
                Account No.: {user?.documents?.account_number || 'NA'}
              </Text>

              <Text style={style.details} numberOfLines={1}>
                IFSC: {user?.documents?.ifsc_code || 'NA'}
              </Text>
            </CollapseBody>
          </Collapse>
        </View>
      ) : null}
    </View>

    {/* --------------- KYC input field section -------------------------------------------------------- */}
    {loadTripInfo()}
    <Card style={style.cardSection}>
      {isVerified || (
        <>
          <View style={[globalStyles.flexRow, globalStyles.mb_1]}></View>
          <TextInput
            ref={nameRef}
            mode="outlined"
            label="Name as per ID Proof"
            value={user?.user_name === 'Partner' ? '' : user.user_name}
            disabled={user.isVerified}
            onChangeText={e => {
              dispatch(updateUserName(e));
            }}
            // placeholder="eg: Bajgrang Logistics"
            keyboardType="default"
            style={style.textInput}
            maxLength={80}
            // right={<TextInput.Affix text="/80" />}
            left={<TextInput.Icon name="account" />}
          />

          <CustomDropdown
            user={'transporter'}
            state={user?.state}
            city={user?.city}
            data={area}
          />

          <TextInput
            ref={addressRef}
            mode="outlined"
            label="Address"
            // placeholder="eg:  Back side of assam kanta,N.H. -37, beltola, guwahati -781029 (assam)"
            value={user?.address}
            onChangeText={e => dispatch(updateAddress(e))}
            keyboardType="default"
            style={[style.textInput, {height: ''}]}
            // maxLength={120}
            multiline={true}
            // right={<TextInput.Affix text="120" />}
            left={<TextInput.Icon name="map-marker-radius-outline" />}
          />
        </>
      )}
      {/* ------------------------------------------------ */}

      <TextInput
        mode="outlined"
        label="E-mail(optional)"
        ref={emailRef}
        // placeholder="eg: trolla@gmail.com"
        value={user?.email}
        keyboardType="email-address"
        onChangeText={e => handleUpdateEmail(e)}
        style={style.textInput}
        maxLength={50}
        // right={<TextInput.Affix text="/50" />}
        left={<TextInput.Icon name="email" />}
        underlineColorAndroid="transparent"
      />
      <TextInput
        ref={secondaryMobileRef}
        mode="outlined"
        label="Secondary Mobile No (Optional)"
        // placeholder="eg: 9864512345"
        value={user?.mobile_secondary?.toString()}
        onChangeText={e => handleUpdateMobile(e)}
        keyboardType="number-pad"
        style={style.textInput}
        maxLength={10}
        // right={<TextInput.Affix text="/10" />}
        left={<TextInput.Icon name="cellphone-basic" />}
      />

      {isVerified || (
        <>
          <TextInput
            ref={gstRef}
            mode="outlined"
            label="Company GST number (Optional)"
            placeholder="eg: 22AAAAA0000A1Z5"
            autoCapitalize="characters"
            value={user?.documents?.gst_number}
            keyboardType="default"
            onChangeText={e => dispatch(updateGstNumber(e))}
            style={style.textInput}
            maxLength={15}
            // right={<TextInput.Affix text="/15" />}
            left={<TextInput.Icon name="numeric" />}
            underlineColorAndroid="transparent"
          />
          <TextInput
            ref={panRef}
            mode="outlined"
            label="Company PAN number (Optional)"
            placeholder="eg: BNZPM0251M"
            value={user?.documents?.pan_number}
            keyboardType="default"
            onChangeText={e => dispatch(updatePanNumber(e))}
            style={style.textInput}
            autoCapitalize="characters"
            maxLength={10}
            // right={<TextInput.Affix text="/10" />}
            left={<TextInput.Icon name="numeric" />}
            underlineColorAndroid="transparent"
          />
        </>
      )}
    </Card>

    {/* --------------- KYC  upload document section -------------------------------------------------------- */}

    {isVerified || (
      // hide this section when user is verified
      <>
        <Card style={style.cardSection}>
          <Card
            elevation={0}
            mode="elevated"
            style={{
              marginTop: heightToDp(2),
            }}>
            <Card.Content>
              <Text style={globalStyles.mediumText}>
                Attach pictures of any of the following Address proofs
              </Text>
            </Card.Content>
          </Card>

          <View style={{marginTop: 20}}>
            <Text style={[style.compactText, {marginBottom: heightToDp(1)}]}>
              {' '}
              Select a document to upload
            </Text>
            <ScrollView
              horizontal
              style={style.chipBox}
              showsHorizontalScrollIndicator={false}>
              {addressProfDocumentTypeListRender}
            </ScrollView>
          </View>
          {user.documents.address_proof_front === null || (
            <Card
              elevation={0}
              style={{
                marginTop: heightToDp(2),
                marginBottom: heightToDp(2),
              }}>
              <Title style={globalStyles.mediumText}>Document</Title>

              {is_address_proof_uploaded === true ? (
                <ActivityIndicator size={'large'} color="tomato" />
              ) : (
                <Card.Cover
                  source={
                    user.documents.address_proof_front /// if driving license is null then set a local demo image else pass uri
                      ? {
                          uri: user.documents.address_proof_front,
                        }
                      : imagePath.DOC_BACKGROUND
                  }
                  style={style.documentImage}
                  resizeMode="stretch"
                />
              )}
            </Card>
          )}
        </Card>

        {/* Back Side of Address*/}
        {user?.documents?.address_proof_front === null ? null : (
          <Card style={style.cardSection}>
            <Card
              elevation={0}
              mode="elevated"
              style={{
                marginTop: heightToDp(2),
              }}>
              <Card.Content>
                <Text style={globalStyles.mediumText}>
                  Attach picture of back side of selected address proof
                  (optional)
                </Text>
              </Card.Content>
            </Card>

            <View style={{marginTop: 20}}>
              <Text style={[style.compactText, {marginBottom: heightToDp(1)}]}>
                {' '}
                Select a document to upload
              </Text>
              <ScrollView
                horizontal
                style={style.chipBox}
                showsHorizontalScrollIndicator={false}>
                {addressProfBackDocumentTypeListRender}
              </ScrollView>
            </View>
            {user.documents.address_proof_back === null || (
              <Card
                elevation={0}
                style={{
                  marginTop: heightToDp(2),
                  marginBottom: heightToDp(2),
                }}>
                <Title style={globalStyles.mediumText}>
                  Back Side of Document
                </Title>

                {is_address_proof_uploaded === true ? (
                  <ActivityIndicator size={'large'} color="tomato" />
                ) : (
                  <Card.Cover
                    source={
                      user.documents.address_proof_back /// if driving license is null then set a local demo image else pass uri
                        ? {
                            uri: user.documents.address_proof_back,
                          }
                        : imagePath.DOC_BACKGROUND
                    }
                    style={style.documentImage}
                    resizeMode="stretch"
                  />
                )}
              </Card>
            )}
          </Card>
        )}

        {/* --------------- KYC address proof document section -------------------------------------------------------- */}

        <Card style={style.cardSection}>
          <Card
            elevation={0}
            mode="elevated"
            style={{
              marginTop: heightToDp(2),
            }}>
            <Card.Content>
              <Text style={globalStyles.mediumText}>
                Attach pictures of any of the following ID proofs
              </Text>
            </Card.Content>
          </Card>
          <View style={{marginTop: 20}}>
            <Text style={[globalStyles.compactText, globalStyles.mb_1]}>
              {' '}
              Select a document to upload
            </Text>
            <ScrollView
              horizontal
              style={style.chipBox}
              showsHorizontalScrollIndicator={false}>
              {idProfDocumentTypeListRender}
            </ScrollView>
          </View>
          {user.documents.id_proof === null || (
            <Card
              elevation={0}
              style={{
                marginTop: heightToDp(2),
                marginBottom: heightToDp(2),
              }}>
              <Title style={globalStyles.mediumText}>Document</Title>

              {is_id_proof_uploaded === true ? (
                <ActivityIndicator size={'large'} color="tomato" />
              ) : (
                <Card.Cover
                  source={
                    user.documents.id_proof
                      ? {
                          uri: user.documents.id_proof,
                        }
                      : imagePath.DOC_BACKGROUND
                  }
                  style={style.documentImage}
                  resizeMode="stretch"
                />
              )}
            </Card>
          )}
        </Card>

        <Card style={style.cardSection}>
          <TextInput
            mode="outlined"
            label="Bank IFSC Code (Optional)"
            placeholder="eg: SBIN0000222"
            autoCapitalize="characters"
            // keyboardType="phone-pad"
            value={user?.ifsc_code}
            onChangeText={e => dispatch(updateIFSC(e))}
            style={[style.textInput, globalStyles.mediumText]}
            maxLength={11}
          />
          <TextInput
            mode="outlined"
            label="Bank Account Number (Optional)"
            placeholder="eg: 20387565125515"
            keyboardType="phone-pad"
            value={user?.acc_number}
            onChangeText={e => dispatch(updateBankAccNo(e))}
            style={[style.textInput, globalStyles.mediumText]}
            maxLength={18}
          />
          <TextInput
            mode="outlined"
            label="Name In Bank Account (Optional)"
            // placeholder="eg: Bikram Singh"
            // keyboardType="phone-pad"
            value={user?.name_in_bank}
            onChangeText={e => dispatch(updateBankAccName(e))}
            style={[style.textInput, globalStyles.mediumText]}
            maxLength={30}
          />
        </Card>
        <Text
          style={[
            style.bottomText,
            globalStyles.mediumText,
            globalStyles.mt_1,
          ]}>
          OR
        </Text>
        <Card style={style.cardSection}>
          <TextInput
            mode="outlined"
            label="UPI (Optional)"
            placeholder="eg: trolla@oksbi"
            // keyboardType="phone-pad"
            value={user?.upi}
            onChangeText={e => dispatch(updateUPI(e))}
            style={[style.textInput, globalStyles.mediumText]}
            maxLength={30}
          />
        </Card>
        <View style={style.bottomSection}>
          <Checkbox
            status={checked ? 'checked' : 'unchecked'}
            onPress={() => {
              setChecked(!checked);
            }}
          />
          <Text
            style={[
              style.bottomText,
              globalStyles.mediumText,
              globalStyles.mt_1,
            ]}>
            I confirm that I am the legal operator of this Trolla Account and I
            agree to the terms & conditions
          </Text>
        </View>
      </>
    )}

    {/* --------------- Save button -------------------------------------------------------- */}
    <Button
      mode="contained"
      color={colorStrings.COLOR_PRIMARY}
      style={{
        marginTop: heightToDp(3),
        marginBottom: heightToDp(10),
        // width: widthToDp(30),
      }}
      disabled={(isChanged && isVerified) || loading}
      onPress={() => kycHandler()}>
      {!isVerified ? 'submit' : 'update'}
    </Button>
  </View>
</ScrollView>;
