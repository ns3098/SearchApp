from mongoengine import Document, StringField


class VoterInfoThane(Document):
    voter_id = StringField(db_field="Voter ID")
    voter_name_eng = StringField(db_field="Voter Name Eng")
    voter_name_hin = StringField(db_field="Voter Name Hin")
    relative_name_eng = StringField(db_field="Relative Name Eng")
    relative_name_hin = StringField(db_field="Relative Name Hin")
    assembly_constituency = StringField(db_field="Assembly Constituency")
    booth_number = StringField(db_field="Booth Number")
    polling_station_eng = StringField(db_field="Polling Station Eng")
    polling_station_hin = StringField(db_field="Polling Station Hin")
    serial_number = StringField(db_field="Serial Number")

    meta = {'collection': "Voter_List_Thane"}

class VoterInfoKalyan(Document):
    voter_id = StringField(db_field="Voter ID")
    voter_name_eng = StringField(db_field="Voter Name Eng")
    voter_name_hin = StringField(db_field="Voter Name Hin")
    relative_name_eng = StringField(db_field="Relative Name Eng")
    relative_name_hin = StringField(db_field="Relative Name Hin")
    assembly_constituency = StringField(db_field="Assembly Constituency")
    booth_number = StringField(db_field="Booth Number")
    polling_station_eng = StringField(db_field="Polling Station Eng")
    polling_station_hin = StringField(db_field="Polling Station Hin")
    serial_number = StringField(db_field="Serial Number")

    meta = {'collection': "Voter_List_Kalyan"}

class VoterInfoBhiwandi(Document):
    voter_id = StringField(db_field="Voter ID")
    voter_name_eng = StringField(db_field="Voter Name Eng")
    voter_name_hin = StringField(db_field="Voter Name Hin")
    relative_name_eng = StringField(db_field="Relative Name Eng")
    relative_name_hin = StringField(db_field="Relative Name Hin")
    assembly_constituency = StringField(db_field="Assembly Constituency")
    booth_number = StringField(db_field="Booth Number")
    polling_station_eng = StringField(db_field="Polling Station Eng")
    polling_station_hin = StringField(db_field="Polling Station Hin")
    serial_number = StringField(db_field="Serial Number")

    meta = {'collection': "Voter_List_Bhiwandi"}